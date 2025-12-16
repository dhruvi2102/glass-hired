import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MultiSelectTypeAhead } from "@/components/custom/MultiSelectTypeAhead";
import { RadioButton } from "@/components/custom/RadioButton";
import { CustomCheckbox } from "@/components/custom/Checkbox";
import {
  Settings,
  Users,
  FileText,
  BarChart3,
  Mail,
  Bell,
  Shield,
  HelpCircle,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Sample data for the table
const sampleUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "Active" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Viewer", status: "Inactive" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Editor", status: "Active" },
  { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "Viewer", status: "Pending" },
];

const skillOptions = [
  { value: "react", label: "React" },
  { value: "typescript", label: "TypeScript" },
  { value: "nodejs", label: "Node.js" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "aws", label: "AWS" },
  { value: "docker", label: "Docker" },
  { value: "graphql", label: "GraphQL" },
];

const sidebarItems = [
  { title: "Dashboard", icon: BarChart3, url: "#dashboard" },
  { title: "Users", icon: Users, url: "#users" },
  { title: "Documents", icon: FileText, url: "#documents" },
  { title: "Settings", icon: Settings, url: "#settings" },
  { title: "Notifications", icon: Bell, url: "#notifications" },
  { title: "Security", icon: Shield, url: "#security" },
];

const ComponentDemo = () => {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [notificationPreference, setNotificationPreference] = useState("email");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [formRole, setFormRole] = useState("viewer");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(sampleUsers.map((u) => u.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId: number, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-cosmic relative overflow-hidden flex flex-col">
      {/* Decorative Orbs */}
      <div className="orb orb-primary w-[600px] h-[600px] -top-[200px] -left-[200px] animate-pulse-glow" />
      <div className="orb orb-secondary w-[500px] h-[500px] top-[40%] -right-[150px] animate-pulse-glow animation-delay-200" />
      
      <Navbar />
      
      <SidebarProvider>
        <div className="flex-1 flex w-full pt-20">
          {/* Sidebar */}
          <Sidebar className="border-r border-border/50 bg-background/80 backdrop-blur-xl">
            <SidebarContent className="pt-4">
              <SidebarGroup>
                <SidebarGroupLabel className="text-foreground/70 font-semibold">
                  Navigation
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {sidebarItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <SidebarMenuButton
                                asChild
                                isActive={activeSection === item.title.toLowerCase()}
                              >
                                <a
                                  href={item.url}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setActiveSection(item.title.toLowerCase());
                                  }}
                                  className={cn(
                                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-all",
                                    activeSection === item.title.toLowerCase()
                                      ? "bg-primary/20 text-primary"
                                      : "hover:bg-muted/50"
                                  )}
                                >
                                  <item.icon className="h-5 w-5" />
                                  <span>{item.title}</span>
                                </a>
                              </SidebarMenuButton>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                              <p>Go to {item.title}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>

          {/* Main Content */}
          <main className="flex-1 p-6 space-y-8">
            {/* Header with Navigation Menu */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="p-2 hover:bg-muted/50 rounded-lg" />
                <h1 className="text-2xl font-bold text-foreground">Component Demo</h1>
              </div>

              {/* Navigation Menu */}
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-background/50 backdrop-blur-sm">
                      Quick Actions
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] gap-2 p-4 bg-background border border-border rounded-lg shadow-lg">
                        <li>
                          <NavigationMenuLink asChild>
                            <a
                              href="#"
                              className="block px-3 py-2 rounded-md hover:bg-muted/50 text-sm"
                            >
                              <Mail className="inline h-4 w-4 mr-2" />
                              Send Email
                            </a>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <a
                              href="#"
                              className="block px-3 py-2 rounded-md hover:bg-muted/50 text-sm"
                            >
                              <Users className="inline h-4 w-4 mr-2" />
                              Add User
                            </a>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <a
                              href="#"
                              className="block px-3 py-2 rounded-md hover:bg-muted/50 text-sm"
                            >
                              <FileText className="inline h-4 w-4 mr-2" />
                              New Report
                            </a>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-background/50 backdrop-blur-sm">
                      Help
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] gap-2 p-4 bg-background border border-border rounded-lg shadow-lg">
                        <li>
                          <NavigationMenuLink asChild>
                            <a
                              href="#"
                              className="block px-3 py-2 rounded-md hover:bg-muted/50 text-sm"
                            >
                              <HelpCircle className="inline h-4 w-4 mr-2" />
                              Documentation
                            </a>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <a
                              href="#"
                              className="block px-3 py-2 rounded-md hover:bg-muted/50 text-sm"
                            >
                              <Info className="inline h-4 w-4 mr-2" />
                              About
                            </a>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Data Table with Checkboxes */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">User Management</h2>
              <div className="rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30">
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedUsers.length === sampleUsers.length}
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleUsers.map((user) => (
                      <TableRow key={user.id} className="hover:bg-muted/20">
                        <TableCell>
                          <Checkbox
                            checked={selectedUsers.includes(user.id)}
                            onCheckedChange={(checked) =>
                              handleSelectUser(user.id, checked as boolean)
                            }
                          />
                        </TableCell>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <span
                            className={cn(
                              "px-2 py-1 rounded-full text-xs font-medium",
                              user.role === "Admin"
                                ? "bg-primary/20 text-primary"
                                : user.role === "Editor"
                                ? "bg-blue-500/20 text-blue-400"
                                : "bg-muted text-muted-foreground"
                            )}
                          >
                            {user.role}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            className={cn(
                              "px-2 py-1 rounded-full text-xs font-medium",
                              user.status === "Active"
                                ? "bg-green-500/20 text-green-400"
                                : user.status === "Inactive"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-yellow-500/20 text-yellow-400"
                            )}
                          >
                            {user.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  Edit
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Edit user details</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {selectedUsers.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  {selectedUsers.length} user(s) selected
                </p>
              )}
            </section>

            {/* Form Section with Radio Groups and Multi-Select */}
            <section className="grid md:grid-cols-2 gap-6">
              {/* Settings Form */}
              <div className="space-y-6 p-6 rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm">
                <h2 className="text-xl font-semibold text-foreground">User Settings</h2>

                {/* Notification Preferences with shadcn Radio Group */}
                <div className="space-y-3">
                  <Label className="text-foreground font-medium">
                    Notification Preferences
                  </Label>
                  <RadioGroup
                    value={notificationPreference}
                    onValueChange={setNotificationPreference}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="email" id="email" />
                      <Label htmlFor="email" className="cursor-pointer">
                        Email notifications
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="push" id="push" />
                      <Label htmlFor="push" className="cursor-pointer">
                        Push notifications
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="sms" id="sms" />
                      <Label htmlFor="sms" className="cursor-pointer">
                        SMS notifications
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="none" id="none" />
                      <Label htmlFor="none" className="cursor-pointer">
                        No notifications
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Multi-Select Skills */}
                <div className="space-y-3">
                  <Label className="text-foreground font-medium">Skills</Label>
                  <MultiSelectTypeAhead
                    options={skillOptions}
                    value={selectedSkills}
                    onChange={setSelectedSkills}
                    placeholder="Search and select skills..."
                    minChars={0}
                  />
                </div>

                {/* Checkboxes */}
                <div className="space-y-3">
                  <Label className="text-foreground font-medium">Preferences</Label>
                  <div className="space-y-2">
                    <CustomCheckbox
                      checked={agreeTerms}
                      onChange={setAgreeTerms}
                      label="I agree to the terms and conditions"
                    />
                    <CustomCheckbox
                      checked={subscribeNewsletter}
                      onChange={setSubscribeNewsletter}
                      label="Subscribe to newsletter"
                    />
                  </div>
                </div>
              </div>

              {/* Add User Form */}
              <div className="space-y-6 p-6 rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm">
                <h2 className="text-xl font-semibold text-foreground">Add New User</h2>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="userName">Full Name</Label>
                    <Input
                      id="userName"
                      placeholder="Enter full name"
                      className="bg-background/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="userEmail">Email</Label>
                    <Input
                      id="userEmail"
                      type="email"
                      placeholder="Enter email address"
                      className="bg-background/50"
                    />
                  </div>

                  {/* Custom Radio Button for Role */}
                  <RadioButton
                    name="userRole"
                    label="User Role"
                    value={formRole}
                    onChange={setFormRole}
                    orientation="horizontal"
                    options={[
                      { value: "admin", label: "Admin" },
                      { value: "editor", label: "Editor" },
                      { value: "viewer", label: "Viewer" },
                    ]}
                  />

                  {/* Skills Multi-Select for Form */}
                  <div className="space-y-2">
                    <Label>Assign Skills</Label>
                    <MultiSelectTypeAhead
                      options={skillOptions}
                      value={[]}
                      onChange={() => {}}
                      placeholder="Select user skills..."
                      minChars={0}
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button className="flex-1">Add User</Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Create new user account</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Button variant="outline">Cancel</Button>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </SidebarProvider>
      
      <Footer />
    </div>
  );
};

export default ComponentDemo;
