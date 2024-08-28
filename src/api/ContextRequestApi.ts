import { APIRequestContext, APIResponse, request } from '@playwright/test'

class ContextRequestApi {
  public context: APIRequestContext
  public url

  public headers: any
  constructor(url) {
    this.url = url
  }
  async setHeader(headers) {
    this.headers = headers
  }
  async initialize() {
    const context = await request.newContext({
      baseURL: this.url,
      extraHTTPHeaders: this.headers
    })
    this.context = context
  }

  getContext() {
    return this.context
  }

  async post<T = unknown>(path: string, opts: { data: T }, header?: any) {
    const res: APIResponse = await this.context.post(path, { data: opts.data, headers: header ? header : this.headers })
    return res
  }

  async put<T = unknown>(path: string, opts: { data: T }, header?: any) {
    const res: APIResponse = await this.context.put(path, { data: opts.data, headers: header ? header : this.headers })

    return res
  }

  async get<_T = unknown>(path: string, opts?: { params: any }, header?: any) {
    const res: APIResponse = await this.context.get(path, {
      params: opts?.params,
      headers: header ? header : this.headers
    })
    return res
  }

  async delete<_T = unknown>(path: string, _header?: any) {
    const res: APIResponse = await this.context.delete(path)
    return res
  }
}

export default ContextRequestApi
