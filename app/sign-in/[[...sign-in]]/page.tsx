import { SignIn } from '@clerk/nextjs'

export default function Page() {
    return     <div className="flex h-screen items-center justify-center bg-gray-200 dark:bg-gray-900">
      <SignIn
        routing="path"
        path="/sign-in"
        // fallbackRedirectUrl ="/candidates" // Fallback redirect if no redirectUrl query param
      />
    </div>
}