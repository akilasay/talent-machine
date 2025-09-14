"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
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
import { updateCandidate } from "@/lib/actions/companion.actions"
import { useRouter } from "next/navigation"

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

interface CandidateEditFormProps {
  candidate: {
    id: string;
    name: string;
    fist_name?: string;
    last_name?: string;
    job: string;
    topic: string;
    education: string;
    experience: number;
    gender?: string;
    academicQualifications: string;
    academic_qualifications?: string;
    professionalQualifications: string;
    professional_qualifications?: string;
  }
  onCancel: () => void
  onSuccess: (updatedCandidate?: {
    id: string;
    name: string;
    fist_name?: string;
    last_name?: string;
    job: string;
    topic: string;
    education: string;
    experience: number;
    gender?: string;
    academicQualifications: string;
    academic_qualifications?: string;
    professionalQualifications: string;
    professional_qualifications?: string;
  }) => void
}

const CandidateEditForm = ({ candidate, onCancel, onSuccess }: CandidateEditFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const router = useRouter()
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fistName: candidate.fist_name || "",
      lastName: candidate.last_name || "",
      job: candidate.job || "",
      topic: candidate.topic || "",
      gender: candidate.gender || "",
      eductaion: candidate.education || "",
      experience: candidate.experience || 15,
      academicQualifications: candidate.academic_qualifications || "",
      professionalQualifications: candidate.professional_qualifications || "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    setSubmitError("")
    
    try {
      console.log("Updating candidate data:", values)
      const updatedCandidate = await updateCandidate(candidate.id, values)
      
      if (updatedCandidate) {
        console.log("Candidate updated successfully:", updatedCandidate)
        onSuccess(updatedCandidate) // Pass the updated candidate data
        router.refresh() // Refresh the page to show updated data
      } else {
        setSubmitError("Failed to update candidate profile")
      }
    } catch (error) {
      console.error("Error updating candidate:", error)
      setSubmitError(error instanceof Error ? error.message : "An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-600 p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Edit Your Profile</h2>
      
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

          {submitError && (
            <div className="p-3 bg-red-50 text-red-800 border border-red-200 rounded-md text-sm">
              {submitError}
            </div>
          )}

          <div className="flex gap-4">
            <Button 
              type="submit" 
              className="flex-1 cursor-pointer" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating Profile..." : "Update Profile"}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default CandidateEditForm
