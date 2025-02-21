let currentId = 0;
export abstract class Entity<Props> {
  readonly id: string;
  protected readonly props: Props;
  constructor(props: Props, id?: string) {
    this.id = (id ? id : currentId).toString();
    currentId++;
    this.props = props;
  }
}
