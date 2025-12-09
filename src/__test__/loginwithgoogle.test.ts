import { describe, it, expect, vi, beforeEach } from "vitest";
import { loginWithGoogle } from "../../src/lib/firebase/service";

vi.mock("firebase/firestore", () => {
  return {
    getFirestore: vi.fn(),
    collection: vi.fn(),
    query: vi.fn(),
    where: vi.fn(),
    getDocs: vi.fn(),
    doc: vi.fn(),
    addDoc: vi.fn(),
    updateDoc: vi.fn(),
  };
});

import { getDocs, addDoc, updateDoc } from "firebase/firestore";

describe("loginWithGoogle()", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should update existing user and call callback with updated data", async () => {
    // Mock existing user
    (getDocs as any).mockResolvedValueOnce({
      docs: [
        {
          id: "user123",
          data: () => ({
            fullname: "Budi",
            email: "budi@example.com",
            role: "member",
          }),
        },
      ],
    });

    const mockCallback = vi.fn();

    const payload = {
      fullname: "Budi",
      email: "budi@example.com",
    };

    (updateDoc as any).mockResolvedValueOnce({});

    await loginWithGoogle(payload, mockCallback);

    expect(updateDoc).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith({
      status: true,
      data: {
        ...payload,
        role: "member",
      },
    });
  });

  it("should create new user if not found and call callback with new data", async () => {
    // Mock no user found
    (getDocs as any).mockResolvedValueOnce({
      docs: [],
    });

    const mockCallback = vi.fn();

    const payload = {
      fullname: "New User",
      email: "new@example.com",
    };

    (addDoc as any).mockResolvedValueOnce({});

    await loginWithGoogle(payload, mockCallback);

    expect(addDoc).toHaveBeenCalledTimes(1);

    expect(mockCallback).toHaveBeenCalledWith({
      status: true,
      data: {
        ...payload,
        role: "member",
      },
    });
  });
});
