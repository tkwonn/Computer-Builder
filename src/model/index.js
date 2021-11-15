export class Computer{
  constructor(cpu, gpu, ram, storage)
  {
    this.cpu = cpu;
    this.gpu = gpu;
    this.ram = ram;
    this.storage = storage;
  }

  getScoreForGaming()
  {
    let score = 0;
    let storageScore = (this.storage.Type === "SSD") ? .1 : .025;
    score += this.cpu["Benchmark"] * .25;
    score += this.gpu["Benchmark"] * .6;
    score += this.ram["Benchmark"] * .125;
    score += this.storage["Benchmark"] * storageScore;
    return Math.floor(score);
  }

  getScoreForWorking()
  {
    let score = 0;
    score += this.cpu["Benchmark"] * .6;
    score += this.gpu["Benchmark"] * .25;
    score += this.ram["Benchmark"] * .1;
    score += this.storage["Benchmark"] * .05;
    return Math.floor(score);
  }
}