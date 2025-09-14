// "use client"

// import { useState, useEffect } from "react"
// import { createSupabaseClient } from "@/lib/supabase-client"
// import { createClient } from "@/lib/supabase/client"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { useAuth } from "@/lib/hooks/useAuth"

// export default function TestDatabase() {
//   const { user } = useAuth()
//   const [testData, setTestData] = useState({
//     fistName: "John",
//     lastName: "Doe",
//     job: "Accountant",
//     topic: "Excel, QuickBooks, Financial Reporting",
//     gender: "male",
//     eductaion: "bsc",
//     experience: 5,
//     academicQualifications: "Bachelor of Science in Accounting",
//     professionalQualifications: "CPA, QuickBooks Certified"
//   })
  
//   const [result, setResult] = useState<string>("")
//   const [loading, setLoading] = useState(false)
//   const [envStatus, setEnvStatus] = useState<string>("")

//   // Check environment variables on component mount
//   useEffect(() => {
//     const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL
//     const hasKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
//     setEnvStatus(`Environment check: URL ${hasUrl ? '✅' : '❌'}, Key ${hasKey ? '✅' : '❌'}`)
//   }, [])

//   const handleTest = async () => {
//     setLoading(true)
//     setResult("")
    
//     try {
//       // Check if environment variables are set
//       const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL
//       const hasKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      
//       setEnvStatus(`Environment check: URL ${hasUrl ? '✅' : '❌'}, Key ${hasKey ? '✅' : '❌'}`)
      
//       if (!hasUrl || !hasKey) {
//         throw new Error("Missing Supabase environment variables. Please check your .env.local file.")
//       }

//       const supabase = createSupabaseClient()
      
//       // Transform the data to match the database schema
//       const candidateData = {
//         fist_name: testData.fistName,
//         last_name: testData.lastName,
//         job: testData.job,
//         topic: testData.topic,
//         gender: testData.gender,
//         education: testData.eductaion,
//         experience: testData.experience,
//         academic_qualifications: testData.academicQualifications,
//         professional_qualifications: testData.professionalQualifications,
//         author: user?.id || "test-user" // Use authenticated user ID or test-user
//       }

//       const { data, error } = await supabase
//         .from('candidates')
//         .insert(candidateData)
//         .select()

//       if (error) {
//         throw new Error(`Database error: ${error.message}`)
//       }

//       setResult(`✅ Success! Candidate created with ID: ${data[0].id}`)
//     } catch (error) {
//       setResult(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="container mx-auto p-8 max-w-2xl">
//       <Card>
//         <CardHeader>
//           <CardTitle>Database Connection Test</CardTitle>
//           <CardDescription>
//             Test if your Supabase connection is working by creating a test candidate.
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="text-sm font-medium">First Name</label>
//               <Input
//                 value={testData.fistName}
//                 onChange={(e) => setTestData({...testData, fistName: e.target.value})}
//               />
//             </div>
//             <div>
//               <label className="text-sm font-medium">Last Name</label>
//               <Input
//                 value={testData.lastName}
//                 onChange={(e) => setTestData({...testData, lastName: e.target.value})}
//               />
//             </div>
//           </div>
          
//           <div>
//             <label className="text-sm font-medium">Job</label>
//             <Input
//               value={testData.job}
//               onChange={(e) => setTestData({...testData, job: e.target.value})}
//             />
//           </div>
          
//           <div>
//             <label className="text-sm font-medium">Skills</label>
//             <Input
//               value={testData.topic}
//               onChange={(e) => setTestData({...testData, topic: e.target.value})}
//             />
//           </div>
          
//           <Button 
//             onClick={handleTest} 
//             disabled={loading}
//             className="w-full"
//           >
//             {loading ? "Testing..." : "Test Database Connection"}
//           </Button>
          
//           {envStatus && (
//             <div className="p-3 bg-blue-50 text-blue-800 border border-blue-200 rounded-md text-sm">
//               {envStatus}
//             </div>
//           )}
          
//           {result && (
//             <div className={`p-4 rounded-md ${
//               result.includes("✅") 
//                 ? "bg-green-50 text-green-800 border border-green-200" 
//                 : "bg-red-50 text-red-800 border border-red-200"
//             }`}>
//               {result}
//             </div>
//           )}
          
//           <div className="text-sm text-gray-600">
//             <p><strong>Instructions:</strong></p>
//             <ol className="list-decimal list-inside space-y-1 mt-2">
//               <li>Make sure you've set up your Supabase project</li>
//               <li>Add your credentials to .env.local file</li>
//               <li>Run the <code>supabase-setup-testing.sql</code> script in Supabase (this disables RLS for testing)</li>
//               <li>Restart your development server: <code>npm run dev</code></li>
//               <li>Click the test button above</li>
//             </ol>
//             <p className="mt-2 text-red-600">
//               <strong>Note:</strong> If you get "No suitable key" error, make sure you're using the testing SQL script and have restarted your dev server.
//             </p>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }


import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page