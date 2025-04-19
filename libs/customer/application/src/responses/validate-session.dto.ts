export class ValidateSessionDto {
  constructor(
    public readonly isAdmin: boolean,
    public readonly userId: number
  ) {}
}
