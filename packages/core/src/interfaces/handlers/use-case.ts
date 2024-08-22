export interface IUseCase<Request = void, Response = void> {
  execute(request: Request): Promise<Response>
}
