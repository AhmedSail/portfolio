"use client";

import * as React from "react";
import * as Icons from "lucide-react";
import * as ReactIcons from "react-icons/ri";
import * as FaIcons from "react-icons/fa";
import * as Fa6Icons from "react-icons/fa6";
import * as ImIcons from "react-icons/im";
import * as SiIcons from "react-icons/si";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Plus,
  Trash2,
  Loader2,
  X,
  Type,
  Tag,
  Pencil,
  BarChart,
  Cpu,
  Search,
  HelpCircle,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Swal from "sweetalert2";

// Helper component to render icons from multiple libraries
const DynamicIcon = ({
  name,
  className,
}: {
  name: string;
  className?: string;
}) => {
  // Check if it's a React Icon (format: "react:IconName")
  if (name?.startsWith("react:")) {
    const iconName = name.replace("react:", "");
    const Icon =
      (ReactIcons as any)[iconName] ||
      (FaIcons as any)[iconName] ||
      (Fa6Icons as any)[iconName] ||
      (ImIcons as any)[iconName] ||
      (SiIcons as any)[iconName];
    if (Icon) return <Icon className={className} />;
  }

  // Default to Lucide icons
  const Icon = (Icons as any)[name];
  if (!Icon) return <HelpCircle className={className} />;
  return <Icon className={className} />;
};

export default function SkillsPage() {
  const [isSaving, setIsSaving] = React.useState(false);
  const [skillsList, setSkillsList] = React.useState<any[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [editingSkill, setEditingSkill] = React.useState<any | null>(null);
  const [searchTerm, setSearchTerm] = React.useState("");

  const [formData, setFormData] = React.useState({
    name: "",
    category: "",
    percentage: "",
    iconName: "",
  });

  const fetchSkills = async () => {
    try {
      const response = await fetch("/api/skills");
      const data = await response.json();
      setSkillsList(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  React.useEffect(() => {
    fetchSkills();
  }, []);

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      percentage: "",
      iconName: "",
    });
    setEditingSkill(null);
  };

  const handleEdit = (skill: any) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name || "",
      category: skill.category || "",
      percentage: skill.percentage || "",
      iconName: skill.iconName || "",
    });
    setIsOpen(true);
  };

  const handleSave = async () => {
    if (!formData.iconName) {
      Swal.fire({
        icon: "error",
        title: "Missing Icon",
        text: "Please enter an icon name (e.g., Code for Lucide or react:FaReact for React Icons)!",
        background: "#1a1a1a",
        color: "#fff",
        confirmButtonColor: "#3b82f6",
      });
      return;
    }

    if (!formData.name) {
      Swal.fire({
        icon: "warning",
        title: "Missing Name",
        text: "Please enter a name for the skill",
        background: "#1a1a1a",
        color: "#fff",
        confirmButtonColor: "#3b82f6",
      });
      return;
    }

    try {
      setIsSaving(true);

      const method = editingSkill ? "PATCH" : "POST";
      const body = {
        ...formData,
        id: editingSkill?.id,
      };

      const response = await fetch("/api/skills", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: editingSkill
            ? "Skill updated successfully!"
            : "Skill added successfully!",
          timer: 2000,
          showConfirmButton: false,
          background: "#1a1a1a",
          color: "#fff",
        });
        setIsOpen(false);
        resetForm();
        fetchSkills();
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: result.error || "Operation failed",
          background: "#1a1a1a",
          color: "#fff",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error processing request",
        background: "#1a1a1a",
        color: "#fff",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (skill: any) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the skill permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
      background: "#1a1a1a",
      color: "#fff",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/skills?id=${skill.id}`, {
          method: "DELETE",
        });
        const res = await response.json();

        if (res.success) {
          Swal.fire({
            title: "Deleted!",
            text: "Skill has been removed.",
            icon: "success",
            background: "#1a1a1a",
            color: "#fff",
          });
          fetchSkills();
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete skill fully",
          background: "#1a1a1a",
          color: "#fff",
        });
      }
    }
  };

  const popularIcons = {
    "Frontend Frameworks": [
      { name: "react:RiNextjsFill", label: "Next.js" },
      { name: "react:FaReact", label: "React" },
      { name: "react:ImHtmlFive2", label: "HTML5" },
      { name: "react:FaCss3", label: "CSS3" },
      { name: "react:RiTailwindCssFill", label: "Tailwind" },
    ],
    "Backend & Database": [
      { name: "react:FaNodeJs", label: "Node.js" },
      { name: "Database", label: "Neon DB" },
      { name: "react:SiMongodb", label: "MongoDB" },
      { name: "Server", label: "Server" },
      { name: "Cloud", label: "Cloud" },
    ],
    "Tools & Services": [
      { name: "Github", label: "GitHub" },
      { name: "Globe", label: "Vercel" },
      { name: "Mail", label: "EmailJS" },
      { name: "Send", label: "Brevo" },
    ],
    "UI Libraries": [
      { name: "Layout", label: "Shadcn" },
      { name: "Layers", label: "Material UI" },
      { name: "Box", label: "Bootstrap" },
    ],
    General: [
      { name: "Code", label: "Code" },
      { name: "Terminal", label: "Terminal" },
      { name: "Cpu", label: "CPU" },
      { name: "Zap", label: "Performance" },
      { name: "Braces", label: "API" },
    ],
  };

  return (
    <div className="p-8 space-y-8 bg-background/50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-2">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-linear-to-br from-blue-600 to-blue-500 shadow-xl shadow-blue-500/30 animate-pulse">
              <Cpu className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-blue-400 via-blue-500 to-purple-400">
              Skills Inventory
            </h1>
          </div>
          <p className="text-muted-foreground text-lg ml-1 flex items-center gap-2">
            <span className="inline-block w-1 h-1 bg-blue-400 rounded-full animate-pulse"></span>
            Manage your technical toolkit with{" "}
            <strong className="text-blue-400">Lucide</strong> &{" "}
            <strong className="text-blue-400">React Icons</strong>
          </p>
        </div>

        <Dialog
          open={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="gap-2 bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/20 px-8 py-6 text-lg rounded-2xl transition-all hover:scale-105 active:scale-95"
              onClick={() => resetForm()}
            >
              <Plus className="w-5 h-5" /> Add Skill
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-card/95 backdrop-blur-xl border-black/5 dark:border-white/10 rounded-[2.5rem]">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-600 dark:from-blue-400 to-blue-400 dark:to-white">
                {editingSkill ? "Edit Skill" : "New Skill"}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-base">
                Choose from <strong className="text-blue-400">Lucide</strong> or{" "}
                <strong className="text-blue-400">React Icons</strong> and set
                your proficiency level.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 py-4">
              {/* Name Input */}
              <div className="grid gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 transition-all focus-within:border-blue-500/50">
                <div className="flex items-center gap-2 text-blue-400">
                  <Type className="w-4 h-4" />
                  <Label htmlFor="name" className="font-semibold text-base">
                    Skill Name
                  </Label>
                </div>
                <Input
                  id="name"
                  placeholder="e.g., React.js, Python"
                  className="bg-transparent border-none text-lg h-10 focus-visible:ring-0 px-0 placeholder:text-muted-foreground/50"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              {/* Icon Selection */}
              <div className="grid gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 transition-all focus-within:border-blue-500/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-blue-400">
                    <Search className="w-4 h-4" />
                    <Label
                      htmlFor="iconName"
                      className="font-semibold text-base"
                    >
                      Icon Name
                    </Label>
                  </div>
                  {formData.iconName && (
                    <div className="flex items-center gap-2 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30">
                      <span className="text-[10px] uppercase font-bold text-blue-400 tracking-widest">
                        Preview:
                      </span>
                      <DynamicIcon
                        name={formData.iconName}
                        className="w-4 h-4 text-blue-400"
                      />
                    </div>
                  )}
                </div>
                <Input
                  id="iconName"
                  placeholder="e.g., Code, Terminal, react:FaReact"
                  className="bg-transparent border-none text-lg h-10 focus-visible:ring-0 px-0 placeholder:text-muted-foreground/50"
                  value={formData.iconName}
                  onChange={(e) =>
                    setFormData({ ...formData, iconName: e.target.value })
                  }
                />

                <Tabs
                  defaultValue="Frontend Frameworks"
                  className="w-full mt-4"
                >
                  <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-3 top-10 z-10">
                    {Object.keys(popularIcons).map((category) => (
                      <TabsTrigger
                        key={category}
                        value={category}
                        className="text-xs font-semibold transition-all duration-300 data-[state=active]:bg-linear-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-blue-500/30 data-[state=inactive]:hover:bg-white/10 rounded-xl py-2.5 px-3"
                      >
                        {category}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  <div className="max-h-[300px] overflow-y-auto pr-2 mt-3 scrollbar-thin scrollbar-thumb-blue-500/50 scrollbar-track-white/5">
                    {Object.entries(popularIcons).map(([category, icons]) => (
                      <TabsContent
                        key={category}
                        value={category}
                        className="mt-0 animate-in fade-in-50 duration-300"
                      >
                        <div className="flex flex-wrap gap-3 p-4 bg-linear-to-br from-white/5 to-transparent rounded-2xl border border-white/5">
                          {icons.map((icon) => (
                            <button
                              key={icon.name}
                              type="button"
                              onClick={() =>
                                setFormData({
                                  ...formData,
                                  iconName: icon.name,
                                })
                              }
                              className={`group relative p-4 rounded-xl border transition-all duration-300 flex flex-col items-center justify-center gap-2 min-w-[80px] hover:scale-105 active:scale-95 ${
                                formData.iconName === icon.name
                                  ? "bg-linear-to-br from-blue-600 to-blue-500 border-blue-400 text-white shadow-2xl shadow-blue-500/40 scale-105"
                                  : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10 hover:border-blue-500/30 hover:shadow-lg"
                              }`}
                              title={icon.label}
                            >
                              <div
                                className={`transition-transform duration-300 ${
                                  formData.iconName === icon.name
                                    ? "scale-110"
                                    : "group-hover:scale-110"
                                }`}
                              >
                                <DynamicIcon
                                  name={icon.name}
                                  className="w-6 h-6"
                                />
                              </div>
                              <span
                                className={`text-[10px] font-bold text-center leading-tight ${
                                  formData.iconName === icon.name
                                    ? "text-white"
                                    : "text-muted-foreground group-hover:text-foreground"
                                }`}
                              >
                                {icon.label}
                              </span>
                              {formData.iconName === icon.name && (
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow-lg animate-pulse" />
                              )}
                            </button>
                          ))}
                        </div>
                      </TabsContent>
                    ))}
                  </div>
                </Tabs>
              </div>

              {/* Category Input */}
              <div className="grid gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 transition-all focus-within:border-blue-500/50">
                <div className="flex items-center gap-2 text-blue-400">
                  <Tag className="w-4 h-4" />
                  <Label htmlFor="category" className="font-semibold text-base">
                    Category
                  </Label>
                </div>
                <Input
                  id="category"
                  placeholder="e.g., Frontend, Backend"
                  className="bg-transparent border-none text-base h-10 focus-visible:ring-0 px-0"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                />
              </div>

              {/* Percentage Input */}
              <div className="grid gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 transition-all focus-within:border-blue-500/50">
                <div className="flex items-center gap-2 text-blue-400">
                  <BarChart className="w-4 h-4" />
                  <Label
                    htmlFor="percentage"
                    className="font-semibold text-base"
                  >
                    Proficiency (%)
                  </Label>
                </div>
                <Input
                  id="percentage"
                  type="number"
                  placeholder="e.g., 90"
                  max="100"
                  min="0"
                  className="bg-transparent border-none text-base h-10 focus-visible:ring-0 px-0"
                  value={formData.percentage}
                  onChange={(e) =>
                    setFormData({ ...formData, percentage: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full h-14 text-xl font-bold rounded-2xl bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-500/10"
              >
                {isSaving ? (
                  <Loader2 className="animate-spin" />
                ) : editingSkill ? (
                  "Update Skill"
                ) : (
                  "Save Skill"
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-none shadow-2xl overflow-hidden bg-card/40 backdrop-blur-md rounded-3xl border border-white/5">
        <CardHeader className="bg-white/5 border-b border-white/5 p-6">
          <CardTitle className="text-2xl font-bold flex items-center gap-3">
            <Cpu className="w-6 h-6 text-blue-400" />
            Stack Inventory
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-white/5">
                  <TableHead className="w-[100px] pl-8">Icon</TableHead>
                  <TableHead>Skill Details</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead className="text-right pr-8">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {skillsList.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-24">
                      <p className="text-muted-foreground">No skills found.</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  skillsList.map((skill) => (
                    <TableRow
                      key={skill.id}
                      className="group hover:bg-white/5 border-white/5 h-24"
                    >
                      <TableCell className="pl-8">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                          <DynamicIcon
                            name={skill.iconName}
                            className="w-6 h-6"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-bold text-lg">{skill.name}</span>
                      </TableCell>
                      <TableCell>
                        <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-xs font-bold border border-blue-500/20 uppercase tracking-widest">
                          {skill.category || "General"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3 w-40">
                          <div className="flex-1 h-2 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden p-px border border-white/5">
                            <div
                              className="h-full bg-linear-to-r from-blue-600 to-blue-400 rounded-full"
                              style={{ width: `${skill.percentage}%` }}
                            />
                          </div>
                          <span className="text-xs font-extra-bold text-blue-500">
                            {skill.percentage}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right pr-8">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-blue-400 hover:bg-blue-500/10 rounded-xl"
                            onClick={() => handleEdit(skill)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-xl"
                            onClick={() => handleDelete(skill)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
