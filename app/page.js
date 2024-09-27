"use client";
import { db } from "@/firebaseConfig"; // Import your Firebase config
import { UserButton, useUser } from "@clerk/nextjs";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    const saveUserInfo = async () => {
      // Ensure user is loaded and authenticated
      if (isLoaded && user) {
        try {
          // Reference to Firestore document in 'Users' collection with a specific user ID
          const userRef = doc(db, "Users", user.id);

          // Save the Clerk user info into Firestore
          await setDoc(userRef, {
            user_email: user.primaryEmailAddress?.emailAddress || "",
            user_fname: user.firstName || "",
            user_lname: user.lastName || "",
            user_nname: user.username || "", // Added nickname
            user_id: user.id,
          });

          console.log("User info saved to Firestore!");
          router.push("/dashboard"); // Redirect to dashboard after saving info
        } catch (error) {
          console.error("Error saving user info to Firestore:", error);
        }
      } else if (isLoaded) {
        // Redirect to courses if user is not signed in
        router.push("/courses");
      }
    };

    saveUserInfo(); // Call the function to save user info
  }, [user, isLoaded, router]);

  return (
    <div>
      <UserButton afterSignOutUrl="/sign-in" />
    </div>
  );
}
