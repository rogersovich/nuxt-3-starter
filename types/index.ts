interface BaseResponse<T>  {
  data: T
  message: string
  statusCode: number
}

interface BaseResponseRickMorty<T>  {
  info: InfoResponse
  results: T
}


type InfoResponse = {
  count: number
  pages: number
  next: string
  prev: string
}

type ErrorResponse = {
  statusCode: number
  message: string
}

