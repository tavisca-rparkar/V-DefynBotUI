import { TestBed } from "@angular/core/testing";

import { ComponentFactoryService } from "./chatComponentCreator.service";

describe("ChatService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: ComponentFactoryService = TestBed.get(ComponentFactoryService);
    expect(service).toBeTruthy();
  });
});
