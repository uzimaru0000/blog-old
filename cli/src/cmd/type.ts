export interface Cmd {
  name: string;
  args?: string[];
  description?: string;
  action(...args: (string | string[])[]): void;
}
