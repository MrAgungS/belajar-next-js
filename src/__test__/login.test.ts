import { describe, it, expect, vi, beforeEach } from "vitest";
import { login } from "@/lib/firebase/service";

// Mock Firebase Firestore
vi.mock("firebase/firestore", () => {
  return {
    getFirestore: vi.fn(),
    collection: vi.fn(),
    query: vi.fn(),
    where: vi.fn(),
    getDocs: vi.fn(),
    doc: vi.fn(),
  };
});

// Ambil mock getDocs untuk diatur respon-nya
import { getDocs } from "firebase/firestore";

describe("login()", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return user when email exists", async () => {
    // Mock hasil snapshot Firestore
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

    const result = await login({ email: "budi@example.com" });

    expect(result).toEqual({
      id: "user123",
      fullname: "Budi",
      email: "budi@example.com",
      role: "member",
    });
  });

  it("should return null when no user found", async () => {
    // Mock snapshot kosong
    (getDocs as any).mockResolvedValueOnce({
      docs: [],
    });

    const result = await login({ email: "notfound@example.com" });

    expect(result).toBeNull();
  });
});
