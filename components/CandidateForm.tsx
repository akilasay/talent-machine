// "use client"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { z } from "zod"
// import { useForm } from "react-hook-form"
// import { Button } from "@/components/ui/button"
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import {jobs} from "@/constants";
// import {Textarea} from "@/components/ui/textarea";

// import {createCandidate} from "@/lib/actions/companion.actions";
// import {redirect} from "next/navigation";



// const formSchema = z.object({
//   fistName: z.string().min(1, {message : 'First Name is required.'}),
//   lastName: z.string().min(1, {message : 'Last Name is required.'}),
//   job: z.string().min(1, {message : 'job is required.'}),
//   topic: z.string().min(1, {message : 'Description is required.'}),
//   gender: z.string().min(1, {message : 'Gender is required.'}),
//   eductaion: z.string().min(1, {message : 'Style is required.'}),
//   experience: z.coerce.number().min(1, { message: 'experience is required.'}),
// })



// const CandidateForm = () => {
//     // 1. Define your form.
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       fistName: "",
//       lastName: "",
//       job: "",
//       topic: "",
//       gender: "",
//       eductaion: "",
//       experience: 15 ,
//     }
//   })
 
//   // 2. Define a submit handler.
//     const onSubmit = async (values: z.infer<typeof formSchema>) => {
//         const companion = await createCandidate(values);
//        if(companion) {
//             redirect(`/candidates/${companion.id}`);
//         } else {
//             console.log('Failed to create a companion');
//             redirect('/');
//         }
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//         <FormField
//           control={form.control}
//           name="fistName"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>First Name</FormLabel>
//               <FormControl>
//                 <Input placeholder="Enter the fist name" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//          <FormField
//           control={form.control}
//           name="lastName"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Last Name</FormLabel>
//               <FormControl>
//                 <Input placeholder="Enter the Last name" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//          <FormField
//           control={form.control}
//           name="job"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>job</FormLabel>
//               <FormControl>
//                 <Select 
//                     onValueChange={field.onChange} 
//                     value={field.value} 
//                     defaultValue={field.value}>
//                   <SelectTrigger className="input capitalize">
//                   <SelectValue placeholder="Select the job" />
//                   </SelectTrigger>
//                   <SelectContent>
//                          {jobs.map((job) => (
//                               <SelectItem
//                                  value={job}
//                                  key={job}
//                                  className="capitalize"
//                                             >
//                                                 {job}
//                                             </SelectItem>
//                                         ))}
//                   </SelectContent>
//                 </Select>

//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//                 <FormField
//                     control={form.control}
//                     name="topic"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Skills</FormLabel>
//                             <FormControl>
//                                 <Textarea
//                                     placeholder="Ex. Excel,tax"
//                                     {...field}
//                                     className="input"
//                                 />
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />

//                 <FormField
//                     control={form.control}
//                     name="gender"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Gender</FormLabel>
//                             <FormControl>
//                                 <Select
//                                     onValueChange={field.onChange}
//                                     value={field.value}
//                                     defaultValue={field.value}
//                                 >
//                                     <SelectTrigger className="input">
//                                         <SelectValue
//                                             placeholder="Select the gender"
//                                         />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         <SelectItem value="male">
//                                             Male
//                                         </SelectItem>
//                                         <SelectItem value="female">
//                                             Female
//                                         </SelectItem>
//                                     </SelectContent>
//                                 </Select>
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//                 <FormField
//                     control={form.control}
//                     name="eductaion"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Eductaion</FormLabel>
//                             <FormControl>
//                                 <Select
//                                     onValueChange={field.onChange}
//                                     value={field.value}
//                                     defaultValue={field.value}
//                                 >
//                                     <SelectTrigger className="input">
//                                         <SelectValue
//                                             placeholder="Select the style"
//                                         />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         <SelectItem value="no">
//                                             High School
//                                         </SelectItem>
//                                         <SelectItem value="diploma">
//                                             Diploma
//                                         </SelectItem>
//                                         <SelectItem value="bsc">
//                                             BSc Degree
//                                         </SelectItem>
//                                          <SelectItem value="msc">
//                                             MSc Degree
//                                         </SelectItem>
//                                     </SelectContent>
//                                 </Select>
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />

//                 <FormField
//                     control={form.control}
//                     name="experience"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Years of Experience</FormLabel>
//                             <FormControl>
//                                 <Input
//                                     type="number"
//                                     placeholder="15"
//                                     {...field}
//                                     className="input"
//                                 />
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//                 <Button type="submit" className="w-full cursor-pointer">Build Your Profile</Button>
//             </form>
//         </Form>
//   )
// }

// export default CandidateForm


"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { jobs } from "@/constants"
import { createCandidate } from "@/lib/actions/companion.actions"
import { redirect } from "next/navigation"

const formSchema = z.object({
  fistName: z.string().min(1, { message: "First Name is required." }),
  lastName: z.string().min(1, { message: "Last Name is required." }),
  job: z.string().min(1, { message: "Job is required." }),
  topic: z.string().min(1, { message: "Description is required." }),
  gender: z.string().min(1, { message: "Gender is required." }),
  eductaion: z.string().min(1, { message: "Education is required." }),
  experience: z.coerce.number().min(1, { message: "Experience is required." }),
  academicQualifications: z.string().min(1, { message: "Academic Qualifications are required." }),
  professionalQualifications: z.string().min(1, { message: "Professional Qualifications are required." }),
})

const CandidateForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fistName: "",
      lastName: "",
      job: "",
      topic: "",
      gender: "",
      eductaion: "",
      experience: 15,
      academicQualifications: "",
      professionalQualifications: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const companion = await createCandidate(values)
    if (companion) {
      redirect(`/candidates/${companion.id}`)
    } else {
      console.log("Failed to create a companion")
      redirect("/")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* First Name */}
        <FormField
          control={form.control}
          name="fistName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter the first name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Last Name */}
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter the last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Job */}
        <FormField
          control={form.control}
          name="job"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                  <SelectTrigger className="input capitalize">
                    <SelectValue placeholder="Select the job" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobs.map((job) => (
                      <SelectItem value={job} key={job} className="capitalize">
                        {job}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Skills */}
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skills</FormLabel>
              <FormControl>
                <Textarea placeholder="Ex. Excel, Tax" {...field} className="input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Gender */}
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                  <SelectTrigger className="input">
                    <SelectValue placeholder="Select the gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Education */}
        <FormField
          control={form.control}
          name="eductaion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Education</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                  <SelectTrigger className="input">
                    <SelectValue placeholder="Select the education" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">High School</SelectItem>
                    <SelectItem value="diploma">Diploma</SelectItem>
                    <SelectItem value="bsc">BSc Degree</SelectItem>
                    <SelectItem value="msc">MSc Degree</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Years of Experience */}
        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Years of Experience</FormLabel>
              <FormControl>
                <Input type="number" placeholder="15" {...field} className="input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Academic Qualifications */}
        <FormField
          control={form.control}
          name="academicQualifications"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Academic Qualifications</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter your academic qualifications" {...field} className="input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Professional Qualifications */}
        <FormField
          control={form.control}
          name="professionalQualifications"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Professional Qualifications</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter your professional qualifications" {...field} className="input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full cursor-pointer">
          Build Your Profile
        </Button>
      </form>
    </Form>
  )
}

export default CandidateForm
