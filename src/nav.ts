import { useRoute, useRouter, type RouteRecordRaw } from 'vue-router'
import { computed, type WritableComputedRef } from 'vue'
import { Logger, logger } from './logger'

type Key<T> = keyof T
type Route = ReturnType<typeof useRoute>
type Router = ReturnType<typeof useRouter>
type RecordRaw = Omit<RouteRecordRaw, 'name'> & { name: string }
const PARAM_NAME = 'params'

class _Nav<P extends object, PKey extends Key<P> = Key<P>> {
  constructor(
    public logger: Logger,
    public route: Route,
    public router: Router,
    public recordRaw: RecordRaw
  ) {}
  /* use params */
  useP<K extends PKey, Default extends NonNullable<P[K]>>(
    k: K,
    defaultValue?: Default
  ): WritableComputedRef<
    Default extends null | undefined ? P[K] | undefined : NonNullable<P[K]>
  > {
    return computed({
      get: () => {
        return this.de()?.[k] ?? defaultValue!
      },
      set: val => {
        this.go({ ...this.de()!, [k]: val })
      },
    })
  }

  /* router.push/replace */
  go(
    p: P = {} as any,
    options: Exclude<Parameters<Router['push' | 'replace']>[0], string> & {
      type?: 'push' | 'replace'
    } = {}
  ) {
    this.router[options.type ?? 'push']({
      name: this.recordRaw.name,
      params: {
        [PARAM_NAME]: this.se(p),
      },
    })
  }

  private se(p: P): string {
    const d = JSON.stringify(p)
    return encodeURI(btoa(d))
  }
  private de(p?: string): P | undefined {
    if (!p) {
      p = (this.route.params[PARAM_NAME] as string) || ''
    }
    const d = atob(decodeURI(p))
    try {
      return JSON.parse(d || '{}')
    } catch (err) {
      this.logger.warn('decode nav params failed: ', err)
      return undefined
    }
  }
}

export class Nav<P extends object = object, PKey extends Key<P> = Key<P>> {
  logger: Logger

  constructor(
    public recordRaw: RecordRaw,
    options: {
      logger?: Logger
    } = {}
  ) {
    this.logger = options.logger ?? logger
  }
  /* in setup scope */
  use(
    options: {
      route?: Route
      router?: Router
    } = {}
  ): _Nav<P, PKey> {
    const { route, router } = options || {}
    return new _Nav(
      this.logger,
      route ?? useRoute(),
      router ?? useRouter(),
      this.recordRaw
    )
  }

  // generate final route
  route(): RouteRecordRaw {
    return {
      ...this.recordRaw,
      path: `${this.recordRaw.path}/:${PARAM_NAME}?`.replace(/\/\//g, '/'),
    } as RouteRecordRaw
  }
}
