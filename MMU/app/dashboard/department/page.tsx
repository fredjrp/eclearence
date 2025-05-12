"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Loader2, CheckCircle2, AlertCircle, Clock } from "lucide-react"
import { mockDepartmentData, mockStudentsData } from "@/lib/mock-data"

export default function DepartmentDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [department, setDepartment] = useState<any>(null)
  const [students, setStudents] = useState<any[]>([])
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [showRejectionForm, setShowRejectionForm] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState("")
  const [facultyFilter, setFacultyFilter] = useState("all")
  const [rejectionForm, setRejectionForm] = useState({
    reasons: [] as string[],
    comment: "",
    evidenceFiles: null as FileList | null,
  })

  useEffect(() => {
    // Check if user is logged in
    const userType = localStorage.getItem("userType")
    const departmentId = localStorage.getItem("departmentId")

    if (!userType || userType !== "department" || !departmentId) {
      router.push("/login")
      return
    }

    // Fetch department data (using mock data for demo)
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Get mock data
        const departmentData = mockDepartmentData[departmentId as keyof typeof mockDepartmentData]
        setDepartment(departmentData)

        // Get students data
        setStudents(mockStudentsData)

        setLoading(false)
      } catch (error) {
        console.error("Error fetching department data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("userType")
    localStorage.removeItem("departmentId")
    router.push("/login")
  }

  const handleShowImage = (imageUrl: string) => {
    setSelectedImage(imageUrl)
    setShowImageModal(true)
  }

  const handleFilterChange = (value: string) => {
    setFacultyFilter(value)
  }

  const handleApproveClearance = async (student: any) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update student data
      const updatedStudents = students.map((s) => {
        if (s.regNumber === student.regNumber) {
          return {
            ...s,
            clearance: {
              ...s.clearance,
              [department.id]: {
                ...s.clearance[department.id],
                status: "completed",
                comment: "",
                previousStatus: s.clearance[department.id].status,
                decisionDate: new Date().toISOString(),
              },
            },
          }
        }
        return s
      })

      setStudents(updatedStudents)
      alert(`Clearance approved for ${student.name}`)
    } catch (error) {
      console.error("Error approving clearance:", error)
      alert("Error approving clearance. Please try again.")
    }
  }

  const handleShowRejectionForm = (student: any) => {
    setSelectedStudent(student)
    setRejectionForm({
      reasons: [],
      comment: "",
      evidenceFiles: null,
    })
    setShowRejectionForm(true)
  }

  const handleRejectionReasonChange = (value: string, checked: boolean) => {
    if (checked) {
      setRejectionForm({
        ...rejectionForm,
        reasons: [...rejectionForm.reasons, value],
      })
    } else {
      setRejectionForm({
        ...rejectionForm,
        reasons: rejectionForm.reasons.filter((r) => r !== value),
      })
    }
  }

  const handleRejectionCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRejectionForm({
      ...rejectionForm,
      comment: e.target.value,
    })
  }

  const handleEvidenceFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setRejectionForm({
        ...rejectionForm,
        evidenceFiles: e.target.files,
      })
    }
  }

  const handleSubmitRejection = async (e: React.FormEvent) => {
    e.preventDefault()

    if (rejectionForm.reasons.length === 0) {
      alert("Please select at least one rejection reason.")
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Get rejection reasons details
      const rejectionReasons = rejectionForm.reasons.map((reasonId) => {
        const reason = department.rejectionReasons.find((r: any) => r.id === reasonId)
        return {
          id: reason.id,
          title: reason.title,
          description: reason.description,
        }
      })

      // Update student data
      const updatedStudents = students.map((s) => {
        if (s.regNumber === selectedStudent.regNumber) {
          return {
            ...s,
            clearance: {
              ...s.clearance,
              [department.id]: {
                ...s.clearance[department.id],
                status: "rejected",
                comment: rejectionForm.comment,
                rejectionReasons: rejectionReasons,
                evidenceImages: rejectionForm.evidenceFiles ? ["/placeholder.svg?height=200&width=200"] : [],
                previousStatus: s.clearance[department.id].status,
                decisionDate: new Date().toISOString(),
              },
            },
          }
        }
        return s
      })

      setStudents(updatedStudents)
      setShowRejectionForm(false)
      alert(`Clearance rejected for ${selectedStudent.name}`)
    } catch (error) {
      console.error("Error rejecting clearance:", error)
      alert("Error rejecting clearance. Please try again.")
    }
  }

  const handleRevokeClearance = async (student: any) => {
    if (!confirm(`Are you sure you want to revoke ${student.name}'s clearance?`)) {
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update student data
      const updatedStudents = students.map((s) => {
        if (s.regNumber === student.regNumber) {
          return {
            ...s,
            clearance: {
              ...s.clearance,
              [department.id]: {
                ...s.clearance[department.id],
                status: "pending",
                comment: "Clearance revoked by department",
                previousStatus: "completed",
                decisionDate: new Date().toISOString(),
              },
            },
          }
        }
        return s
      })

      setStudents(updatedStudents)
      alert(`Clearance revoked for ${student.name}`)
    } catch (error) {
      console.error("Error revoking clearance:", error)
      alert("Error revoking clearance. Please try again.")
    }
  }

  const getPendingStudents = () => {
    return students.filter(
      (student) =>
        student.clearance[department.id].status === "pending" &&
        (facultyFilter === "all" || student.faculty === facultyFilter),
    )
  }

  const getClearedStudents = () => {
    return students.filter(
      (student) =>
        student.clearance[department.id].status !== "pending" &&
        (facultyFilter === "all" || student.faculty === facultyFilter),
    )
  }

  const getDepartmentSpecificStudentInfo = (student: any) => {
    if (!student.departmentInfo || !student.departmentInfo[department.id]) {
      return null
    }

    const deptInfo = student.departmentInfo[department.id]

    switch (department.id) {
      case "library":
        if (deptInfo.unreturnedBooks && deptInfo.unreturnedBooks.length > 0) {
          return (
            <div className="mt-2">
              <p className="font-medium">Unreturned Books:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                {deptInfo.unreturnedBooks.map((book: any, index: number) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                    <div
                      className="w-12 h-16 bg-gray-200 rounded cursor-pointer"
                      onClick={() => handleShowImage(book.image || "/placeholder.svg?height=160&width=120")}
                    >
                      <Image
                        src={book.image || "/placeholder.svg?height=160&width=120"}
                        alt={book.title}
                        width={120}
                        height={160}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">{book.title}</p>
                      <p>Author: {book.author}</p>
                      <p>Due: {book.dueDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        }
        break

      case "finance":
        if (deptInfo.balance) {
          return (
            <p className="text-red-600 font-medium mt-2">
              Outstanding Balance: KES {deptInfo.balance.toLocaleString()}
            </p>
          )
        }
        break

      case "academic":
        if (deptInfo.attendance && deptInfo.attendance.length > 0) {
          return (
            <div className="mt-2">
              <p className="font-medium">Attendance Records:</p>
              <div className="space-y-2 mt-1">
                {deptInfo.attendance.map((course: any, index: number) => (
                  <div key={index} className="p-2 bg-gray-50 rounded-md">
                    <p className="font-medium">
                      {course.code}: {course.name}
                    </p>
                    <p className={`text-sm ${course.attendance < 75 ? "text-red-600" : "text-green-600"}`}>
                      Attendance: {course.attendance}% (Minimum required: 75%)
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )
        }
        break

      case "hostel":
        if (deptInfo.damages && deptInfo.damages.length > 0) {
          return (
            <div className="mt-2">
              <p className="font-medium">Hostel Damages:</p>
              <div className="space-y-2 mt-1">
                {deptInfo.damages.map((damage: any, index: number) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                    <div
                      className="w-12 h-12 bg-gray-200 rounded cursor-pointer"
                      onClick={() => handleShowImage(damage.image || "/placeholder.svg?height=120&width=120")}
                    >
                      <Image
                        src={damage.image || "/placeholder.svg?height=120&width=120"}
                        alt={damage.item}
                        width={120}
                        height={120}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">{damage.item}</p>
                      <p>Description: {damage.description}</p>
                      <p>Cost: KES {damage.cost.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        }
        break
    }

    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="bg-green-700 text-white py-4 sticky top-0 z-10 shadow-md">
          <div className="container mx-auto px-4">
            <h1 className="text-xl md:text-2xl font-bold text-center">Multimedia University - E-Clearance System</h1>
          </div>
        </header>

        <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-green-700" />
            <p className="mt-4 text-lg">Loading dashboard...</p>
          </div>
        </main>

        <footer className="bg-gray-100 py-4 text-center text-gray-600 text-sm">
          <div className="container mx-auto px-4">
            <p>&copy; {new Date().getFullYear()} Multimedia University - Group 16. All rights reserved.</p>
          </div>
        </footer>
      </div>
    )
  }

  if (!department) {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="bg-green-700 text-white py-4 sticky top-0 z-10 shadow-md">
          <div className="container mx-auto px-4">
            <h1 className="text-xl md:text-2xl font-bold text-center">Multimedia University - E-Clearance System</h1>
          </div>
        </header>

        <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 mx-auto text-red-600" />
            <p className="mt-4 text-lg">Error loading department data. Please try again later.</p>
            <Button onClick={() => router.push("/login")} className="mt-4">
              Back to Login
            </Button>
          </div>
        </main>

        <footer className="bg-gray-100 py-4 text-center text-gray-600 text-sm">
          <div className="container mx-auto px-4">
            <p>&copy; {new Date().getFullYear()} Multimedia University - Group 16. All rights reserved.</p>
          </div>
        </footer>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-green-700 text-white py-4 sticky top-0 z-10 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-xl md:text-2xl font-bold text-center">Multimedia University - E-Clearance System</h1>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-green-700">{department.name} Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="mb-6 bg-blue-50 border-blue-200">
              <CheckCircle2 className="h-5 w-5 text-blue-700" />
              <AlertTitle className="text-blue-700 font-bold text-lg">Great Work! 🌟</AlertTitle>
              <AlertDescription className="text-blue-700">
                Your efficient processing of clearance requests helps students progress in their academic journey.
                <br />
                Keep up the good work!
              </AlertDescription>
            </Alert>

            <Tabs defaultValue="pending-clearance">
              <TabsList className="mb-6">
                <TabsTrigger value="pending-clearance">Pending Clearance</TabsTrigger>
                <TabsTrigger value="cleared-students">Cleared Students</TabsTrigger>
                <TabsTrigger value="department-info">Department Info</TabsTrigger>
              </TabsList>

              <TabsContent value="pending-clearance">
                <Alert className="mb-4">
                  <AlertDescription>
                    Below is the list of students pending clearance in your department.
                  </AlertDescription>
                </Alert>

                <div className="mb-4">
                  <Label htmlFor="faculty-filter" className="mb-2 block">
                    Filter by Faculty:
                  </Label>
                  <Select value={facultyFilter} onValueChange={handleFilterChange}>
                    <SelectTrigger className="w-full md:w-[200px]">
                      <SelectValue placeholder="Select faculty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Faculties</SelectItem>
                      <SelectItem value="BBIT">BBIT</SelectItem>
                      <SelectItem value="FAMECO">FAMECO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  {getPendingStudents().length === 0 ? (
                    <div className="text-center py-8">
                      <CheckCircle2 className="h-12 w-12 mx-auto text-green-700 mb-2" />
                      <p className="text-lg font-medium">No pending clearance requests</p>
                      <p className="text-gray-500">All students have been processed.</p>
                    </div>
                  ) : (
                    getPendingStudents().map((student) => (
                      <Card key={student.regNumber} className="overflow-hidden">
                        <div className="p-4 md:p-6 flex flex-col md:flex-row justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-semibold">{student.name}</h3>
                              <Badge
                                className={`
                                  ${student.faculty === "BBIT" ? "bg-blue-100 text-blue-800" : ""}
                                  ${student.faculty === "FAMECO" ? "bg-purple-100 text-purple-800" : ""}
                                `}
                              >
                                {student.faculty}
                              </Badge>
                            </div>

                            <p className="text-gray-600">
                              {student.regNumber} - {student.program}
                            </p>

                            {getDepartmentSpecificStudentInfo(student)}

                            {department.id === "finance" && student.clearance.finance.paymentProof && (
                              <div className="mt-2">
                                <p className="font-medium">Payment Proof:</p>
                                <div
                                  className="w-20 h-20 bg-gray-200 rounded mt-1 cursor-pointer"
                                  onClick={() => handleShowImage(student.clearance.finance.paymentProof)}
                                >
                                  <Image
                                    src={student.clearance.finance.paymentProof || "/placeholder.svg"}
                                    alt="Payment Proof"
                                    width={80}
                                    height={80}
                                    className="w-full h-full object-cover rounded"
                                  />
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <Button
                              variant="default"
                              size="sm"
                              className="bg-green-700 hover:bg-green-800"
                              onClick={() => handleApproveClearance(student)}
                            >
                              <CheckCircle2 className="h-4 w-4 mr-1" />
                              Approve
                            </Button>

                            <Button variant="destructive" size="sm" onClick={() => handleShowRejectionForm(student)}>
                              <AlertCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="cleared-students">
                <Alert className="mb-4">
                  <AlertDescription>
                    Below is the list of students who have been cleared or rejected by your department.
                  </AlertDescription>
                </Alert>

                <div className="mb-4">
                  <Label htmlFor="cleared-faculty-filter" className="mb-2 block">
                    Filter by Faculty:
                  </Label>
                  <Select value={facultyFilter} onValueChange={handleFilterChange}>
                    <SelectTrigger className="w-full md:w-[200px]">
                      <SelectValue placeholder="Select faculty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Faculties</SelectItem>
                      <SelectItem value="BBIT">BBIT</SelectItem>
                      <SelectItem value="FAMECO">FAMECO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  {getClearedStudents().length === 0 ? (
                    <div className="text-center py-8">
                      <Clock className="h-12 w-12 mx-auto text-amber-500 mb-2" />
                      <p className="text-lg font-medium">No cleared or rejected students</p>
                      <p className="text-gray-500">You haven't processed any clearance requests yet.</p>
                    </div>
                  ) : (
                    getClearedStudents().map((student) => {
                      const clearanceStatus = student.clearance[department.id].status

                      return (
                        <Card key={student.regNumber} className="overflow-hidden">
                          <div className="p-4 md:p-6 flex flex-col md:flex-row justify-between gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <h3 className="text-lg font-semibold">{student.name}</h3>
                                <Badge
                                  className={`
                                    ${student.faculty === "BBIT" ? "bg-blue-100 text-blue-800" : ""}
                                    ${student.faculty === "FAMECO" ? "bg-purple-100 text-purple-800" : ""}
                                  `}
                                >
                                  {student.faculty}
                                </Badge>
                              </div>

                              <p className="text-gray-600">
                                {student.regNumber} - {student.program}
                              </p>

                              {clearanceStatus === "rejected" && student.clearance[department.id].rejectionReasons && (
                                <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r-md mt-2">
                                  <p className="font-medium text-amber-800">Rejection Reasons:</p>
                                  <ul className="list-disc list-inside text-amber-700 text-sm">
                                    {student.clearance[department.id].rejectionReasons.map(
                                      (reason: any, index: number) => (
                                        <li key={index}>
                                          {reason.title}: {reason.description}
                                        </li>
                                      ),
                                    )}
                                  </ul>
                                  {student.clearance[department.id].comment && (
                                    <p className="text-sm italic mt-1 text-amber-800">
                                      <span className="font-medium">Comment:</span>{" "}
                                      {student.clearance[department.id].comment}
                                    </p>
                                  )}
                                </div>
                              )}

                              {student.clearance[department.id].evidenceImages &&
                                student.clearance[department.id].evidenceImages.length > 0 && (
                                  <div className="mt-2">
                                    <p className="font-medium">Evidence:</p>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                      {student.clearance[department.id].evidenceImages.map(
                                        (image: string, index: number) => (
                                          <div
                                            key={index}
                                            className="w-16 h-16 bg-gray-200 rounded cursor-pointer"
                                            onClick={() => handleShowImage(image)}
                                          >
                                            <Image
                                              src={image || "/placeholder.svg"}
                                              alt="Evidence"
                                              width={64}
                                              height={64}
                                              className="w-full h-full object-cover rounded"
                                            />
                                          </div>
                                        ),
                                      )}
                                    </div>
                                  </div>
                                )}
                            </div>

                            <div className="flex flex-col items-end gap-2">
                              <Badge
                                className={`
                                  ${clearanceStatus === "completed" ? "bg-green-100 text-green-800" : ""}
                                  ${clearanceStatus === "rejected" ? "bg-red-100 text-red-800" : ""}
                                `}
                              >
                                {clearanceStatus === "completed" ? "Completed" : "Rejected"}
                              </Badge>

                              <div className="flex flex-wrap gap-2 mt-2">
                                {clearanceStatus === "completed" ? (
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleRevokeClearance(student)}
                                  >
                                    Revoke
                                  </Button>
                                ) : (
                                  <Button
                                    variant="default"
                                    size="sm"
                                    className="bg-green-700 hover:bg-green-800"
                                    onClick={() => handleApproveClearance(student)}
                                  >
                                    Approve Now
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </Card>
                      )
                    })
                  )}
                </div>
              </TabsContent>

              <TabsContent value="department-info">
                <Card>
                  <CardHeader>
                    <CardTitle>Department Specific Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-green-700 mb-2">
                          {department.name} Clearance Requirements:
                        </h3>
                        <ul className="list-disc list-inside space-y-1">
                          {department.requirements.map((req: string, index: number) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-green-700 mb-2">Common Rejection Reasons:</h3>
                        <ul className="list-disc list-inside space-y-1">
                          {department.rejectionReasons.map((reason: any, index: number) => (
                            <li key={index}>
                              <span className="font-medium">{reason.title}:</span> {reason.description}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Button variant="destructive" className="mt-8 w-full" onClick={handleLogout}>
                  Logout
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>

      <footer className="bg-gray-100 py-4 text-center text-gray-600 text-sm">
        <div className="container mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} Multimedia University - Group 16. All rights reserved.</p>
        </div>
      </footer>

      {/* Rejection Form Dialog */}
      <Dialog open={showRejectionForm} onOpenChange={setShowRejectionForm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Reject Clearance</DialogTitle>
            <DialogDescription>
              Select the reasons for rejection and provide additional details if needed.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmitRejection} className="space-y-4">
            <div className="space-y-2">
              <Label className="font-medium">Select Rejection Reasons:</Label>
              <div className="space-y-2">
                {department.rejectionReasons.map((reason: any) => (
                  <div key={reason.id} className="flex items-start space-x-2">
                    <Checkbox
                      id={`reason-${reason.id}`}
                      checked={rejectionForm.reasons.includes(reason.id)}
                      onCheckedChange={(checked) => handleRejectionReasonChange(reason.id, checked as boolean)}
                    />
                    <Label htmlFor={`reason-${reason.id}`} className="text-sm font-normal leading-tight">
                      <span className="font-medium">{reason.title}:</span> {reason.description}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comment">Additional Comment (Optional):</Label>
              <Textarea
                id="comment"
                placeholder="Provide additional details about the rejection"
                value={rejectionForm.comment}
                onChange={handleRejectionCommentChange}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="evidence">Upload Evidence Images (Optional):</Label>
              <Input id="evidence" type="file" accept="image/*" multiple onChange={handleEvidenceFilesChange} />
            </div>

            <Button type="submit" className="w-full bg-green-700 hover:bg-green-800">
              Submit Rejection
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Image View Dialog */}
      <Dialog open={showImageModal} onOpenChange={setShowImageModal}>
        <DialogContent className="max-w-md">
          <div className="flex justify-center">
            <Image
              src={selectedImage || "/placeholder.svg?height=300&width=300"}
              alt="Enlarged view"
              width={300}
              height={300}
              className="max-h-[70vh] w-auto object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
