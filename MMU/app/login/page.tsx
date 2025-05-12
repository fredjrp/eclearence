"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"student" | "department">("student")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Student login form state
  const [studentCredentials, setStudentCredentials] = useState({
    regNumber: "",
    password: "",
    rememberMe: false,
  })

  // Department login form state
  const [departmentCredentials, setDepartmentCredentials] = useState({
    department: "",
    password: "",
  })

  // Handle student login form changes
  const handleStudentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setStudentCredentials({
      ...studentCredentials,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  // Handle department login form changes
  const handleDepartmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDepartmentCredentials({
      ...departmentCredentials,
      [name]: value,
    })
  }

  // Handle department select change
  const handleDepartmentSelect = (value: string) => {
    setDepartmentCredentials({
      ...departmentCredentials,
      department: value,
    })
  }

  // Handle student login form submission
  const handleStudentLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For demo purposes, hardcode a successful login
      if (studentCredentials.regNumber === "BUS-242-028/2022" && studentCredentials.password === "BUS-242-028/2022") {
        // Save to localStorage if remember me is checked
        if (studentCredentials.rememberMe) {
          localStorage.setItem("userType", "student")
          localStorage.setItem("userId", studentCredentials.regNumber)
        }

        router.push("/dashboard/student")
      } else {
        setError("Invalid registration number or password")
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  // Handle department login form submission
  const handleDepartmentLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For demo purposes, hardcode successful logins for departments
      const deptPasswords: Record<string, string> = {
        finance: "finance123",
        library: "library123",
        academic: "academic123",
        admin: "admin123",
        hostel: "hostel123",
        sports: "sports123",
        health: "health123",
        examinations: "exams123",
      }

      if (
        departmentCredentials.department &&
        deptPasswords[departmentCredentials.department] === departmentCredentials.password
      ) {
        // Save to localStorage
        localStorage.setItem("userType", "department")
        localStorage.setItem("departmentId", departmentCredentials.department)

        router.push("/dashboard/department")
      } else {
        setError("Invalid department or password")
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-green-700 text-white py-4 sticky top-0 z-10 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-xl md:text-2xl font-bold text-center">Multimedia University - E-Clearance System</h1>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <Tabs defaultValue="student" onValueChange={(value) => setActiveTab(value as "student" | "department")}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="department">Department</TabsTrigger>
            </TabsList>

            <TabsContent value="student">
              <Card>
                <CardHeader>
                  <CardTitle>Student Login</CardTitle>
                  <CardDescription>
                    Enter your registration number and password to access your clearance dashboard.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {error && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <form onSubmit={handleStudentLogin}>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="regNumber">Registration Number</Label>
                        <Input
                          id="regNumber"
                          name="regNumber"
                          placeholder="e.g. BUS-242-028/2022"
                          value={studentCredentials.regNumber}
                          onChange={handleStudentChange}
                          required
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Enter your password"
                          value={studentCredentials.password}
                          onChange={handleStudentChange}
                          required
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="rememberMe"
                          name="rememberMe"
                          checked={studentCredentials.rememberMe}
                          onCheckedChange={(checked) =>
                            setStudentCredentials({
                              ...studentCredentials,
                              rememberMe: checked as boolean,
                            })
                          }
                        />
                        <Label htmlFor="rememberMe" className="text-sm font-normal">
                          Remember me
                        </Label>
                      </div>

                      <Button type="submit" disabled={loading} className="bg-green-700 hover:bg-green-800">
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Logging in...
                          </>
                        ) : (
                          "Login"
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="department">
              <Card>
                <CardHeader>
                  <CardTitle>Department Login</CardTitle>
                  <CardDescription>
                    Select your department and enter your password to access the department dashboard.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {error && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <form onSubmit={handleDepartmentLogin}>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="department">Department</Label>
                        <Select
                          value={departmentCredentials.department}
                          onValueChange={handleDepartmentSelect}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="finance">Finance Department</SelectItem>
                            <SelectItem value="library">Library Department</SelectItem>
                            <SelectItem value="academic">Academic Department</SelectItem>
                            <SelectItem value="admin">Administration</SelectItem>
                            <SelectItem value="hostel">Hostel Department</SelectItem>
                            <SelectItem value="sports">Sports Department</SelectItem>
                            <SelectItem value="health">Health Center</SelectItem>
                            <SelectItem value="examinations">Examinations Office</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="deptPassword">Password</Label>
                        <Input
                          id="deptPassword"
                          name="password"
                          type="password"
                          placeholder="Enter department password"
                          value={departmentCredentials.password}
                          onChange={handleDepartmentChange}
                          required
                        />
                      </div>

                      <Button type="submit" disabled={loading} className="bg-green-700 hover:bg-green-800">
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Logging in...
                          </>
                        ) : (
                          "Login"
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
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
