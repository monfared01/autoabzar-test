export class ValidateSessionResponose {
  constructor(
    public readonly isAdmin: boolean,
    public readonly userId: number
  ) {}
}
