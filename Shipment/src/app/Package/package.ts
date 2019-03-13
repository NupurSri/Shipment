/* Package model class */
export class Package {
  private packageName: string;
  private packageWeight: any;
  private currency: string;
  private packageValue: any;

  constructor(packageName?: string, packageWeight?: any, currency?: string, packageValue?: any) {
    this.packageName = packageName;
    this.packageWeight = packageWeight;
    this.currency = currency;
    this.packageValue = packageValue;
  }

  getPackageName(): string {
    return this.packageName;
  }

  setPackageName(value: string) {
    this.packageName = value;
  }

  getPackageWeight(): any {
    return this.packageWeight;
  }

  setPackageWeight(value: any) {
    this.packageWeight = value;
  }

  getCurrency(): string {
    return this.currency;
  }

  setCurrency(value: string) {
    this.currency = value;
  }

  getPackageValue(): any {
    return this.packageValue;
  }

  setPackageValue(value: any) {
    this.packageValue = value;
  }
}
