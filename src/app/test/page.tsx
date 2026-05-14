"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, limit, query } from "firebase/firestore";

export default function FirebaseTestPage() {
  const [status, setStatus] = useState<"loading" | "connected" | "error">("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkConnection() {
      try {
        // Attempt a very lightweight operation to verify connection
        // We use a dummy collection name; if Firebase connects, it will either succeed or throw a permission error
        const q = query(collection(db, "_connection_test"), limit(1));
        await getDocs(q);
        setStatus("connected");
      } catch (err: any) {
        // A permission-denied error indicates we successfully reached Firestore,
        // but security rules prevented the read (which is normal and means we are connected).
        if (err?.code === "permission-denied") {
          setStatus("connected");
        } else {
          console.error("Firebase connection error:", err);
          setStatus("error");
          setError(err.message || "Unknown error occurred while connecting to Firebase");
        }
      }
    }

    checkConnection();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Firebase Status</h1>
        
        {status === "loading" && (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Checking connection...</p>
          </div>
        )}

        {status === "connected" && (
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h2 className="text-xl font-bold text-green-700">Firebase Connected</h2>
            <p className="text-green-600 mt-2 text-sm">Successfully initialized and connected to Firestore.</p>
          </div>
        )}

        {status === "error" && (
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <h2 className="text-xl font-bold text-red-700">Connection Failed</h2>
            <p className="text-red-600 mt-2 text-sm">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
