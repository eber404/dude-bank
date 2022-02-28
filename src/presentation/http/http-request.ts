export class HttpRequest {
  method: string;
  headers: string;
  body: any;
  params: string;
  query: any;

  constructor(props: HttpRequest) {
    this.method = props.method || '';
    this.headers = props.headers || '';
    this.body = props.body || {};
    this.params = props.params || '';
    this.query = props.query || {};
  }
}
