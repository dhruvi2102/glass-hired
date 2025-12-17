import React, { useState, useMemo } from "react";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MultiSelectTypeAhead } from "@/components/custom/MultiSelectTypeAhead";
import { RadioButton } from "@/components/custom/RadioButton";
import { CustomCheckbox } from "@/components/custom/Checkbox";
import { useIsMobile } from "@/hooks/use-mobile";
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
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Extended sample data for pagination demo
const sampleUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "Active" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Viewer", status: "Inactive" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Editor", status: "Active" },
  { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "Viewer", status: "Pending" },
  { id: 6, name: "Diana Ross", email: "diana@example.com", role: "Admin", status: "Active" },
  { id: 7, name: "Edward King", email: "edward@example.com", role: "Editor", status: "Inactive" },
  { id: 8, name: "Fiona Green", email: "fiona@example.com", role: "Viewer", status: "Active" },
  { id: 9, name: "George Miller", email: "george@example.com", role: "Editor", status: "Pending" },
  { id: 10, name: "Hannah White", email: "hannah@example.com", role: "Admin", status: "Active" },
  { id: 11, name: "Ian Black", email: "ian@example.com", role: "Viewer", status: "Inactive" },
  { id: 12, name: "Julia Adams", email: "julia@example.com", role: "Editor", status: "Active" },
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

type SortKey = "name" | "email" | "role" | "status";
type SortDirection = "asc" | "desc" | null;

const ComponentDemo = () => {
  const isMobile = useIsMobile();
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [notificationPreference, setNotificationPreference] = useState("email");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [formRole, setFormRole] = useState("viewer");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  
  // Sorting state
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  // Sort and paginate data
  const sortedUsers = useMemo(() => {
    let result = [...sampleUsers];
    if (sortKey && sortDirection) {
      result.sort((a, b) => {
        const aVal = a[sortKey].toLowerCase();
        const bVal = b[sortKey].toLowerCase();
        const comparison = aVal.localeCompare(bVal);
        return sortDirection === "desc" ? -comparison : comparison;
      });
    }
    return result;
  }, [sortKey, sortDirection]);

  const totalPages = Math.ceil(sortedUsers.length / pageSize);
  const paginatedUsers = sortedUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      if (sortDirection === "asc") setSortDirection("desc");
      else if (sortDirection === "desc") {
        setSortKey(null);
        setSortDirection(null);
      }
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
    setCurrentPage(1);
  };

  const getSortIcon = (key: SortKey) => {
    if (sortKey !== key) return <ArrowUpDown className="h-4 w-4 ml-1" />;
    if (sortDirection === "asc") return <ArrowUp className="h-4 w-4 ml-1" />;
    return <ArrowDown className="h-4 w-4 ml-1" />;
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(paginatedUsers.map((u) => u.id));
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
      <div className="orb orb-primary w-[300px] h-[300px] md:w-[600px] md:h-[600px] -top-[100px] -left-[100px] md:-top-[200px] md:-left-[200px] animate-pulse-glow" />
      <div className="orb orb-secondary w-[250px] h-[250px] md:w-[500px] md:h-[500px] top-[40%] -right-[75px] md:-right-[150px] animate-pulse-glow animation-delay-200" />
      
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
          <main className="flex-1 p-4 md:p-6 space-y-6 md:space-y-8 overflow-x-hidden">
            {/* Header with Navigation Menu */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <SidebarTrigger className="p-2 hover:bg-muted/50 rounded-lg" />
                <h1 className="text-xl md:text-2xl font-bold text-foreground">Component Demo</h1>
              </div>

              {/* Navigation Menu */}
              <NavigationMenu className="hidden sm:flex">
                <NavigationMenuList className="gap-1">
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-background/50 backdrop-blur-sm text-xs sm:text-sm px-2 sm:px-4">
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
                    <NavigationMenuTrigger className="bg-background/50 backdrop-blur-sm text-xs sm:text-sm px-2 sm:px-4">
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

            {/* Data Table with Checkboxes, Sorting, and Pagination */}
            <section className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h2 className="text-xl font-semibold text-foreground">User Management</h2>
                <p className="text-sm text-muted-foreground">
                  Showing {paginatedUsers.length} of {sortedUsers.length} users (Page {currentPage} of {totalPages})
                </p>
              </div>
              
              {/* Mobile Sort Controls */}
              {isMobile && (
                <div className="flex gap-2">
                  <Select value={sortKey || ""} onValueChange={(value) => handleSort(value as SortKey)}>
                    <SelectTrigger className="flex-1 bg-background/50">
                      <SelectValue placeholder="Sort by..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="role">Role</SelectItem>
                      <SelectItem value="status">Status</SelectItem>
                    </SelectContent>
                  </Select>
                  {sortKey && (
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setSortDirection(d => d === "asc" ? "desc" : "asc")}
                      className="bg-background/50"
                    >
                      {sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                    </Button>
                  )}
                </div>
              )}

              {/* Desktop Table View */}
              {!isMobile && (
                <div className="rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/30">
                        <TableHead className="w-12">
                          <Checkbox
                            checked={paginatedUsers.length > 0 && paginatedUsers.every(u => selectedUsers.includes(u.id))}
                            onCheckedChange={handleSelectAll}
                          />
                        </TableHead>
                        <TableHead>
                          <button
                            onClick={() => handleSort("name")}
                            className="flex items-center hover:text-primary transition-colors"
                          >
                            Name {getSortIcon("name")}
                          </button>
                        </TableHead>
                        <TableHead>
                          <button
                            onClick={() => handleSort("email")}
                            className="flex items-center hover:text-primary transition-colors"
                          >
                            Email {getSortIcon("email")}
                          </button>
                        </TableHead>
                        <TableHead>
                          <button
                            onClick={() => handleSort("role")}
                            className="flex items-center hover:text-primary transition-colors"
                          >
                            Role {getSortIcon("role")}
                          </button>
                        </TableHead>
                        <TableHead>
                          <button
                            onClick={() => handleSort("status")}
                            className="flex items-center hover:text-primary transition-colors"
                          >
                            Status {getSortIcon("status")}
                          </button>
                        </TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedUsers.map((user) => (
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
              )}

              {/* Mobile Card View */}
              {isMobile && (
                <div className="space-y-3">
                  {/* Select All */}
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30">
                    <Checkbox
                      checked={paginatedUsers.length > 0 && paginatedUsers.every(u => selectedUsers.includes(u.id))}
                      onCheckedChange={handleSelectAll}
                    />
                    <span className="text-sm text-muted-foreground">Select all on this page</span>
                  </div>
                  
                  {paginatedUsers.map((user) => (
                    <div
                      key={user.id}
                      className="p-4 rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <Checkbox
                            checked={selectedUsers.includes(user.id)}
                            onCheckedChange={(checked) =>
                              handleSelectUser(user.id, checked as boolean)
                            }
                          />
                          <div>
                            <p className="font-medium text-foreground">{user.name}</p>
                            <p className="text-sm text-muted-foreground break-all">{user.email}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
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
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination>
                  <PaginationContent className="flex-wrap justify-center gap-1">
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        className={cn(
                          "cursor-pointer",
                          currentPage === 1 && "pointer-events-none opacity-50"
                        )}
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => setCurrentPage(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        className={cn(
                          "cursor-pointer",
                          currentPage === totalPages && "pointer-events-none opacity-50"
                        )}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
              
              {selectedUsers.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  {selectedUsers.length} user(s) selected
                </p>
              )}
            </section>

            {/* Form Section with Radio Groups and Multi-Select */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Settings Form */}
              <div className="space-y-4 md:space-y-6 p-4 md:p-6 rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm">
                <h2 className="text-lg md:text-xl font-semibold text-foreground">User Settings</h2>

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
              <div className="space-y-4 md:space-y-6 p-4 md:p-6 rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm">
                <h2 className="text-lg md:text-xl font-semibold text-foreground">Add New User</h2>

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
