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
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Loader2, CheckCircle2, AlertCircle, Send, Upload, Eye } from "lucide-react"
import { mockStudentData } from "@/lib/mock-data"

export default function StudentDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [student, setStudent] = useState<any>(null)
  const [profileForm, setProfileForm] = useState({
    email: "",
    phone: "",
  })
  const [savingProfile, setSavingProfile] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null)
  const [showRejectionDetails, setShowRejectionDetails] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState("")
  const [allClearancesCompleted, setAllClearancesCompleted] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const userType = localStorage.getItem("userType")
    const userId = localStorage.getItem("userId")

    if (!userType || userType !== "student" || !userId) {
      router.push("/login")
      return
    }

    // Fetch student data (using mock data for demo)
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Get mock data
        const studentData = mockStudentData
        setStudent(studentData)

        // Set profile form data
        setProfileForm({
          email: studentData.email || "",
          phone: studentData.phone || "",
        })

        // Check if all clearances are completed
        const allCompleted = Object.values(studentData.clearance).every((item: any) => item.status === "completed")
        setAllClearancesCompleted(allCompleted)

        setLoading(false)
      } catch (error) {
        console.error("Error fetching student data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [router])

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileForm({
      ...profileForm,
      [name]: value,
    })
  }

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSavingProfile(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update student data
      setStudent({
        ...student,
        email: profileForm.email,
        phone: profileForm.phone,
      })

      alert("Profile updated successfully!")
    } catch (error) {
      console.error("Error updating profile:", error)
      alert("Error updating profile. Please try again.")
    } finally {
      setSavingProfile(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("userType")
    localStorage.removeItem("userId")
    router.push("/login")
  }

  const handleNudgeDepartment = async (dept: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert(`Nudge sent to ${dept} department successfully!`)
    } catch (error) {
      console.error("Error sending nudge:", error)
      alert("Error sending nudge. Please try again.")
    }
  }

  const handleViewRejectionDetails = (dept: string) => {
    setSelectedDepartment(dept)
    setShowRejectionDetails(true)
  }

  const handleRequestReclearance = async () => {
    if (!selectedDepartment) return

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update student data
      const updatedClearance = {
        ...student.clearance,
        [selectedDepartment]: {
          ...student.clearance[selectedDepartment],
          status: "pending",
          comment: "",
          rejectionReasons: [],
        },
      }

      setStudent({
        ...student,
        clearance: updatedClearance,
      })

      setShowRejectionDetails(false)
      alert("Re-clearance request submitted successfully!")
    } catch (error) {
      console.error("Error requesting re-clearance:", error)
      alert("Error requesting re-clearance. Please try again.")
    }
  }

  const handleShowPaymentModal = () => {
    setShowPaymentModal(true)
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update student data
      const updatedClearance = {
        ...student.clearance,
        finance: {
          ...student.clearance.finance,
          paymentProof: "/placeholder.svg?height=200&width=200",
          paymentAmount: "12500",
          paymentReference: "MMU123456",
          paymentDate: new Date().toISOString().split("T")[0],
        },
      }

      setStudent({
        ...student,
        clearance: updatedClearance,
      })

      setShowPaymentModal(false)
      alert("Payment proof submitted successfully!")
    } catch (error) {
      console.error("Error submitting payment:", error)
      alert("Error submitting payment. Please try again.")
    }
  }

  const handleShowImage = (imageUrl: string) => {
    setSelectedImage(imageUrl)
    setShowImageModal(true)
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

  if (!student) {
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
            <p className="mt-4 text-lg">Error loading student data. Please try again later.</p>
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
            <CardTitle className="text-2xl text-green-700">Student Clearance Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="clearance-status">
              <TabsList className="mb-6">
                <TabsTrigger value="clearance-status">Clearance Status</TabsTrigger>
                <TabsTrigger value="profile">My Profile</TabsTrigger>
              </TabsList>

              <TabsContent value="clearance-status">
                {allClearancesCompleted && (
                  <Alert className="mb-6 bg-green-50 border-green-200">
                    <CheckCircle2 className="h-5 w-5 text-green-700" />
                    <AlertTitle className="text-green-700 font-bold text-lg">Congratulations! 🎉</AlertTitle>
                    <AlertDescription className="text-green-700">
                      You have successfully completed all clearance requirements!
                      <br />
                      You can now proceed with your academic journey without any hindrances.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-4">
                  {Object.entries(student.clearance).map(([dept, clearance]: [string, any]) => {
                    const deptNames: Record<string, string> = {
                      finance: "Finance Department",
                      library: "Library Department",
                      academic: "Academic Department",
                      admin: "Administration",
                      hostel: "Hostel Department",
                      sports: "Sports Department",
                      health: "Health Center",
                      examinations: "Examinations Office",
                    }

                    const deptName = deptNames[dept] || dept

                    let statusBadge
                    switch (clearance.status) {
                      case "completed":
                        statusBadge = (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
                        )
                        break
                      case "rejected":
                        statusBadge = <Badge variant="destructive">Rejected</Badge>
                        break
                      default:
                        statusBadge = (
                          <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                            Pending
                          </Badge>
                        )
                    }

                    return (
                      <Card key={dept} className="overflow-hidden">
                        <div className="p-4 md:p-6 flex flex-col md:flex-row justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-semibold">{deptName}</h3>
                              {statusBadge}
                            </div>

                            {clearance.status === "rejected" && clearance.rejectionReasons && (
                              <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r-md">
                                <p className="font-medium text-amber-800">Rejection Reasons:</p>
                                <ul className="list-disc list-inside text-amber-700 text-sm">
                                  {clearance.rejectionReasons.map((reason: any, index: number) => (
                                    <li key={index}>
                                      {reason.title}: {reason.description}
                                    </li>
                                  ))}
                                </ul>
                                {clearance.comment && (
                                  <p className="text-sm italic mt-1 text-amber-800">
                                    <span className="font-medium">Comment:</span> {clearance.comment}
                                  </p>
                                )}
                              </div>
                            )}

                            {dept === "finance" && student.departmentInfo?.finance?.balance && (
                              <p className="text-red-600 font-medium">
                                Outstanding Balance: KES {student.departmentInfo.finance.balance.toLocaleString()}
                              </p>
                            )}

                            {dept === "library" && student.departmentInfo?.library?.unreturnedBooks?.length > 0 && (
                              <div className="mt-2">
                                <p className="font-medium">Unreturned Books:</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                                  {student.departmentInfo.library.unreturnedBooks.map((book: any, index: number) => (
                                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                                      <div
                                        className="w-12 h-16 bg-gray-200 rounded cursor-pointer"
                                        onClick={() =>
                                          handleShowImage(book.image || "/placeholder.svg?height=160&width=120")
                                        }
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
                            )}

                            {clearance.paymentProof && (
                              <div className="mt-2">
                                <p className="font-medium">Payment Proof:</p>
                                <div
                                  className="w-20 h-20 bg-gray-200 rounded mt-1 cursor-pointer"
                                  onClick={() => handleShowImage(clearance.paymentProof)}
                                >
                                  <Image
                                    src={clearance.paymentProof || "/placeholder.svg"}
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
                            {clearance.status === "pending" && (
                              <>
                                <Button variant="outline" size="sm" onClick={() => handleNudgeDepartment(dept)}>
                                  <Send className="h-4 w-4 mr-1" />
                                  Nudge
                                </Button>

                                {dept === "finance" && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleShowPaymentModal}
                                    className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                                  >
                                    <Upload className="h-4 w-4 mr-1" />
                                    Upload Payment
                                  </Button>
                                )}
                              </>
                            )}

                            {clearance.status === "rejected" && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewRejectionDetails(dept)}
                                className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View Details
                              </Button>
                            )}
                          </div>
                        </div>
                      </Card>
                    )
                  })}
                </div>
              </TabsContent>

              <TabsContent value="profile">
                <div className="flex flex-col items-center mb-6">
                  <div className="relative mb-4">
                    <Image
                      src={student.profileImage || "/placeholder.svg?height=150&width=150"}
                      alt="Profile"
                      width={150}
                      height={150}
                      className="rounded-full border-4 border-green-700 object-cover"
                    />
                    <Button size="sm" className="absolute bottom-0 right-0 rounded-full bg-blue-600 hover:bg-blue-700">
                      Change
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-gray-500">Name</p>
                          <p className="font-medium">{student.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Registration Number</p>
                          <p className="font-medium">{student.regNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Program</p>
                          <p className="font-medium">{student.program}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Faculty</p>
                          <p className="font-medium">{student.faculty}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Year of Study</p>
                          <p className="font-medium">{student.year}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleProfileSubmit}>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={profileForm.email}
                              onChange={handleProfileChange}
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={profileForm.phone}
                              onChange={handleProfileChange}
                              required
                            />
                          </div>

                          <Button
                            type="submit"
                            className="w-full bg-green-700 hover:bg-green-800"
                            disabled={savingProfile}
                          >
                            {savingProfile ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                              </>
                            ) : (
                              "Save Changes"
                            )}
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </div>

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

      {/* Rejection Details Dialog */}
      <Dialog open={showRejectionDetails} onOpenChange={setShowRejectionDetails}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Clearance Rejection Details</DialogTitle>
            <DialogDescription>
              Review the reasons for rejection and request re-clearance if you've resolved the issues.
            </DialogDescription>
          </DialogHeader>

          {selectedDepartment && student.clearance[selectedDepartment].rejectionReasons && (
            <div className="space-y-4">
              <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r-md">
                <p className="font-medium text-amber-800">Rejection Reasons:</p>
                <ul className="list-disc list-inside text-amber-700">
                  {student.clearance[selectedDepartment].rejectionReasons.map((reason: any, index: number) => (
                    <li key={index}>
                      {reason.title}: {reason.description}
                    </li>
                  ))}
                </ul>
                {student.clearance[selectedDepartment].comment && (
                  <p className="italic mt-2 text-amber-800">
                    <span className="font-medium">Comment:</span> {student.clearance[selectedDepartment].comment}
                  </p>
                )}
              </div>

              <Button className="w-full bg-green-700 hover:bg-green-800" onClick={handleRequestReclearance}>
                Request Re-clearance
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Payment Upload Dialog */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Payment Proof</DialogTitle>
            <DialogDescription>Provide details of your payment and upload proof for verification.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handlePaymentSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="payment-amount">Amount Paid</Label>
              <Input id="payment-amount" type="number" placeholder="Enter amount paid" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="payment-reference">Payment Reference</Label>
              <Input id="payment-reference" placeholder="Enter payment reference" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="payment-date">Payment Date</Label>
              <Input id="payment-date" type="date" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="payment-proof">Upload Payment Proof (Image/PDF)</Label>
              <Input id="payment-proof" type="file" accept="image/*,.pdf" required />
            </div>

            <Button type="submit" className="w-full bg-green-700 hover:bg-green-800">
              Submit Payment Proof
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
