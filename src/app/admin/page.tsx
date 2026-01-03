"use client";

import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { ForgeHeader } from "@/components/layout/ForgeHeader";
import { Button } from "@/components/ui/Button";
import { 
  Save, RefreshCw, Eye, Code, Smartphone, Upload, Loader2, Copy, 
  Plus, Trash2, ArrowUp, ArrowDown, Layers, List, Hammer, FilePlus, X, Map as MapIcon, MousePointerClick
} from "lucide-react";
import { RuneTablet } from "@/components/lesson/RuneTablet";
import { MediaFrame } from "@/components/lesson/MediaFrame";
import { HoldButton } from "@/components/lesson/HoldButton";
import { MapNode } from "@/components/map/MapNode";
import { MapConnector } from "@/components/map/MapConnector";
import { NodeType } from "@/lib/types";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ADMIN_EMAIL = "bgondaniel@gmail.com"; 

export default function AdminCMS() {
  const [nodes, setNodes] = useState<any[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Preview Modes
  const [previewMode, setPreviewMode] = useState<'mobile' | 'desktop'>('desktop');
  const [previewView, setPreviewView] = useState<'lesson' | 'map'>('lesson');
  
  const [activeTab, setActiveTab] = useState<'core' | 'steps' | 'drills'>('core');

  // Core Identity State
  const [editId, setEditId] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editChapter, setEditChapter] = useState("");
  
  // JSON Data State (Visual Editor Fields)
  const [formData, setFormData] = useState<any>({
    type: "lesson",
    description: "",
    position: { x: 50, y: 50 },
    xpReward: 50,
    requiredXP: 0,
    requires: [],
    hotkeys: [],
    steps: [],
    drills: []
  });

  // Upload State
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  useEffect(() => {
    checkAdmin();
    fetchNodes();
  }, []);

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user?.email === ADMIN_EMAIL) {
      setIsAdmin(true);
    }
  };

  const fetchNodes = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('curriculum_nodes')
      .select('*')
      .order('chapter_id', { ascending: true })
      .order('id', { ascending: true });
    
    if (data) setNodes(data);
    setLoading(false);
  };

  const handleSelect = (node: any) => {
    setSelectedNodeId(node.id);
    setEditId(node.id);
    setEditTitle(node.title);
    setEditChapter(node.chapter_id);
    setFormData({
      type: node.data.type || "lesson",
      description: node.data.description || "",
      position: node.data.position || { x: 50, y: 50 },
      xpReward: node.data.xpReward || 50,
      requiredXP: node.data.requiredXP || 0,
      requires: node.data.requires || [],
      hotkeys: node.data.hotkeys || [],
      steps: node.data.steps || [],
      drills: node.data.drills || []
    });
    setUploadedUrl(null);
  };

  const handleCreateNew = () => {
    setSelectedNodeId('new'); // Special flag for new mode
    setEditId(""); // Clear ID so user can type it
    setEditTitle("New Lesson");
    setEditChapter("chapter-1");
    setFormData({
      type: "lesson",
      description: "",
      position: { x: 50, y: 50 },
      xpReward: 50,
      requiredXP: 0,
      requires: [],
      hotkeys: [],
      steps: [],
      drills: []
    });
    setUploadedUrl(null);
  };

  const handleDelete = async (id: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent selection when clicking delete
    if (!confirm(`Are you sure you want to delete node "${id}"? This cannot be undone.`)) return;

    try {
      const { error } = await supabase
        .from('curriculum_nodes')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      // If deleted node was selected, clear selection
      if (selectedNodeId === id) {
        setSelectedNodeId(null);
      }
      
      await fetchNodes(); // Refresh list
    } catch (e: any) {
      alert("Error deleting node: " + e.message);
    }
  };

  const handleSave = async () => {
    if (!editId.trim()) {
      alert("Node ID is required.");
      return;
    }
    setSaving(true);
    try {
      const { error } = await supabase
        .from('curriculum_nodes')
        .upsert({
          id: editId, 
          chapter_id: editChapter,
          title: editTitle,
          type: formData.type,
          data: formData,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      alert("Saved to Cloud!");
      await fetchNodes(); 
      // Select the newly created/updated node
      const { data } = await supabase.from('curriculum_nodes').select('*').eq('id', editId).single();
      if(data) handleSelect(data);

    } catch (e: any) {
      alert("Error: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  // --- FORM HANDLERS ---

  const updateField = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const updatePosition = (axis: 'x' | 'y', value: number) => {
    setFormData((prev: any) => ({ 
      ...prev, 
      position: { ...prev.position, [axis]: value } 
    }));
  };

  const addListItem = (listName: string, template: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [listName]: [...(prev[listName] || []), template]
    }));
  };

  const updateListItem = (listName: string, index: number, field: string, value: any) => {
    setFormData((prev: any) => {
      const newList = [...(prev[listName] || [])];
      if (listName === 'hotkeys' || listName === 'requires') {
        newList[index] = value;
      } else {
        newList[index] = { ...newList[index], [field]: value };
      }
      return { ...prev, [listName]: newList };
    });
  };

  const removeListItem = (listName: string, index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      [listName]: prev[listName].filter((_: any, i: number) => i !== index)
    }));
  };

  const moveListItem = (listName: string, index: number, direction: -1 | 1) => {
    setFormData((prev: any) => {
      const newList = [...prev[listName]];
      if (index + direction < 0 || index + direction >= newList.length) return prev;
      const temp = newList[index];
      newList[index] = newList[index + direction];
      newList[index + direction] = temp;
      return { ...prev, [listName]: newList };
    });
  };

  // --- NESTED DRILL STEP HANDLERS ---
  
  const updateDrillStep = (drillIndex: number, stepIndex: number, value: string) => {
    setFormData((prev: any) => {
      const newDrills = [...prev.drills];
      const newSteps = [...(newDrills[drillIndex].steps || [])];
      newSteps[stepIndex] = value;
      newDrills[drillIndex] = { ...newDrills[drillIndex], steps: newSteps };
      return { ...prev, drills: newDrills };
    });
  };

  const addDrillStep = (drillIndex: number) => {
    setFormData((prev: any) => {
      const newDrills = [...prev.drills];
      const currentSteps = newDrills[drillIndex].steps || [];
      newDrills[drillIndex] = { ...newDrills[drillIndex], steps: [...currentSteps, ""] };
      return { ...prev, drills: newDrills };
    });
  };

  const removeDrillStep = (drillIndex: number, stepIndex: number) => {
    setFormData((prev: any) => {
      const newDrills = [...prev.drills];
      const newSteps = (newDrills[drillIndex].steps || []).filter((_: any, i: number) => i !== stepIndex);
      newDrills[drillIndex] = { ...newDrills[drillIndex], steps: newSteps };
      return { ...prev, drills: newDrills };
    });
  };

  // --- UPLOAD HANDLERS ---

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;
    const file = event.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    setUploading(true);
    setUploadedUrl(null);

    try {
      const { error: uploadError } = await supabase.storage.from('lesson-assets').upload(filePath, file);
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from('lesson-assets').getPublicUrl(filePath);
      setUploadedUrl(data.publicUrl);
    } catch (error: any) {
      alert('Error: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const copyUrl = () => {
    if (uploadedUrl) {
      navigator.clipboard.writeText(uploadedUrl);
      alert("URL Copied!");
    }
  };

  // --- MAP PREVIEW HELPERS ---
  
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (previewView !== 'map') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    updatePosition('x', Math.round(x));
    updatePosition('y', Math.round(y));
  };

  const findNodeCoords = (id: string) => {
    // Check nodes in DB
    const dbNode = nodes.find(n => n.id === id);
    if (dbNode) return dbNode.data.position;
    
    // Check currently editing node (if it refers to itself, though that shouldn't happen for requires)
    if (editId === id) return formData.position;

    return null;
  };

  const previewData = useMemo(() => {
    return { ...formData, title: editTitle };
  }, [formData, editTitle]);

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-void text-slate-200 flex flex-col">
      <div className="relative z-50">
        <ForgeHeader />
      </div>
      
      <main className="flex-1 grid grid-cols-12 h-[calc(100vh-64px)] overflow-hidden">
        
        {/* LEFT: Node List */}
        <div className="col-span-2 border-r border-slate-800 bg-slate-950 flex flex-col h-full">
          <div className="p-4 border-b border-slate-800 bg-void flex justify-between items-center">
            <h2 className="text-sm font-serif text-amber-500 uppercase tracking-widest">Nodes</h2>
            <div className="flex gap-2">
              <button onClick={handleCreateNew} className="text-amber-500 hover:text-white" title="Create New Node">
                <FilePlus size={18} />
              </button>
              <button onClick={fetchNodes} className="text-slate-400 hover:text-white" title="Refresh">
                <RefreshCw size={18} />
              </button>
            </div>
          </div>
          <div className="overflow-y-auto flex-1">
            {nodes.map((node) => (
              <div
                key={node.id}
                onClick={() => handleSelect(node)}
                className={`w-full text-left px-4 py-3 border-b border-slate-900/50 hover:bg-slate-900 transition-colors flex justify-between items-center cursor-pointer group ${selectedNodeId === node.id ? 'bg-amber-900/10 border-l-2 border-l-amber-500' : ''}`}
              >
                <div>
                  <div className="font-mono text-[10px] text-slate-500">{node.id}</div>
                  <div className="font-serif text-sm text-slate-300 truncate">{node.title}</div>
                </div>
                
                <button 
                  onClick={(e) => handleDelete(node.id, e)}
                  className="p-1.5 text-slate-600 hover:text-red-500 hover:bg-slate-800 rounded opacity-0 group-hover:opacity-100 transition-all"
                  title="Delete Node"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* MIDDLE: Visual Editor */}
        <div className="col-span-4 border-r border-slate-800 bg-void flex flex-col h-full">
          <div className="p-4 border-b border-slate-800 bg-void flex justify-between items-center">
            <div className="flex gap-2">
              <button onClick={() => setActiveTab('core')} className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider ${activeTab === 'core' ? 'bg-slate-800 text-amber-500' : 'text-slate-500 hover:text-slate-300'}`}><Layers size={14} className="inline mr-1" /> Core</button>
              <button onClick={() => setActiveTab('steps')} className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider ${activeTab === 'steps' ? 'bg-slate-800 text-amber-500' : 'text-slate-500 hover:text-slate-300'}`}><List size={14} className="inline mr-1" /> Steps</button>
              {formData.type === 'boss' && (
                <button onClick={() => setActiveTab('drills')} className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider ${activeTab === 'drills' ? 'bg-slate-800 text-amber-500' : 'text-slate-500 hover:text-slate-300'}`}><Hammer size={14} className="inline mr-1" /> Drills</button>
              )}
            </div>
            <Button onClick={handleSave} size="sm" disabled={saving} className="h-8 text-xs">
              {saving ? "Saving..." : "Save"}
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {selectedNodeId ? (
              <>
                {/* Global Asset Uploader */}
                <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg space-y-2 mb-6">
                  <label className="text-[10px] uppercase text-slate-500 flex justify-between">
                    <span>Quick Upload</span>
                    {uploadedUrl && <span className="text-green-500">Ready to copy</span>}
                  </label>
                  <div className="flex gap-2">
                    <label className="cursor-pointer bg-slate-800 border border-slate-700 hover:border-amber-500/50 rounded flex items-center justify-center px-3 py-1 text-xs text-slate-300 transition-colors gap-2">
                      {uploading ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />}
                      Upload
                      <input type="file" onChange={handleFileUpload} className="hidden" accept="image/*,video/mp4,video/webm" />
                    </label>
                    {uploadedUrl && (
                      <div className="flex-1 flex gap-2">
                        <input readOnly value={uploadedUrl} className="flex-1 bg-black/50 border border-slate-700 rounded px-2 text-[10px] text-slate-400 font-mono truncate" />
                        <button onClick={copyUrl} className="text-slate-400 hover:text-white" title="Copy URL"><Copy size={14}/></button>
                      </div>
                    )}
                  </div>
                </div>

                {/* --- TAB: CORE --- */}
                {activeTab === 'core' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] uppercase text-slate-500 block mb-1">ID (Unique)</label>
                        <input 
                          value={editId} 
                          onChange={e => setEditId(e.target.value)} 
                          disabled={selectedNodeId !== 'new'} 
                          className={`w-full bg-slate-900 border border-slate-700 p-2 rounded text-slate-300 font-mono text-xs ${selectedNodeId === 'new' ? 'border-amber-500/50 text-amber-200' : 'opacity-70 cursor-not-allowed'}`}
                          placeholder="e.g. node-1-1" 
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase text-slate-500 block mb-1">Chapter</label>
                        <input value={editChapter} onChange={e => setEditChapter(e.target.value)} className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-slate-300 font-mono text-xs" placeholder="chapter-1" />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase text-slate-500 block mb-1">Title</label>
                      <input value={editTitle} onChange={e => setEditTitle(e.target.value)} className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-amber-400 font-serif text-lg" />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase text-slate-500 block mb-1">Description</label>
                      <textarea value={formData.description} onChange={e => updateField('description', e.target.value)} className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-slate-300 text-sm h-24" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] uppercase text-slate-500 block mb-1">Type</label>
                        <select value={formData.type} onChange={e => updateField('type', e.target.value)} className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-slate-300 text-sm">
                          <option value="lesson">Lesson</option>
                          <option value="boss">Boss</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] uppercase text-slate-500 block mb-1">XP Reward</label>
                        <input type="number" value={formData.xpReward} onChange={e => updateField('xpReward', Number(e.target.value))} className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-slate-300 text-sm" />
                      </div>
                    </div>

                    {formData.type === 'boss' && (
                      <div>
                        <label className="text-[10px] uppercase text-slate-500 block mb-1">Required XP (Gatekeeper)</label>
                        <input type="number" value={formData.requiredXP} onChange={e => updateField('requiredXP', Number(e.target.value))} className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-slate-300 text-sm" />
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] uppercase text-slate-500 block mb-1">Map X (%)</label>
                        <input type="number" value={formData.position?.x} onChange={e => updatePosition('x', Number(e.target.value))} className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-slate-300 text-sm" />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase text-slate-500 block mb-1">Map Y (%)</label>
                        <input type="number" value={formData.position?.y} onChange={e => updatePosition('y', Number(e.target.value))} className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-slate-300 text-sm" />
                      </div>
                    </div>
                    
                    {/* REQUIRES (Dependencies) */}
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-[10px] uppercase text-slate-500 block">Requires (Node IDs)</label>
                        <button onClick={() => addListItem('requires', '')} className="text-xs text-amber-500 hover:text-white flex gap-1"><Plus size={12}/> Add</button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(formData.requires || []).map((req: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-1 bg-slate-800 rounded px-2 py-1">
                            <input 
                              value={req} 
                              onChange={e => updateListItem('requires', idx, '', e.target.value)}
                              className="bg-transparent w-24 text-xs text-center text-mono outline-none text-slate-300"
                              placeholder="node-id"
                            />
                            <button onClick={() => removeListItem('requires', idx)} className="text-slate-500 hover:text-red-400"><Trash2 size={10}/></button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* HOTKEYS */}
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-[10px] uppercase text-slate-500 block">Hotkeys</label>
                        <button onClick={() => addListItem('hotkeys', '')} className="text-xs text-amber-500 hover:text-white flex gap-1"><Plus size={12}/> Add</button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(formData.hotkeys || []).map((key: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-1 bg-slate-800 rounded px-2 py-1">
                            <input 
                              value={key} 
                              onChange={e => updateListItem('hotkeys', idx, '', e.target.value)}
                              className="bg-transparent w-16 text-xs text-center text-mono outline-none text-amber-200"
                            />
                            <button onClick={() => removeListItem('hotkeys', idx)} className="text-slate-500 hover:text-red-400"><Trash2 size={10}/></button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* --- TAB: STEPS --- */}
                {activeTab === 'steps' && (
                  <div className="space-y-4">
                    <Button onClick={() => addListItem('steps', { title: "New Step", description: "" })} size="sm" variant="ghost" className="w-full border-dashed border-slate-700 text-slate-500">
                      <Plus size={14} className="mr-2"/> Add Step
                    </Button>
                    
                    {formData.steps?.map((step: any, idx: number) => (
                      <div key={idx} className="bg-slate-900/50 border border-slate-700 p-4 rounded-lg group relative">
                        <div className="absolute right-2 top-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => moveListItem('steps', idx, -1)} className="p-1 text-slate-500 hover:text-white"><ArrowUp size={14}/></button>
                          <button onClick={() => moveListItem('steps', idx, 1)} className="p-1 text-slate-500 hover:text-white"><ArrowDown size={14}/></button>
                          <button onClick={() => removeListItem('steps', idx)} className="p-1 text-slate-500 hover:text-red-400"><Trash2 size={14}/></button>
                        </div>
                        
                        <div className="space-y-3">
                          <input 
                            value={step.title} 
                            onChange={e => updateListItem('steps', idx, 'title', e.target.value)}
                            className="w-full bg-transparent border-b border-slate-700 pb-1 text-amber-100 font-serif focus:border-amber-500 outline-none" 
                            placeholder="Step Title"
                          />
                          <textarea 
                            value={step.description} 
                            onChange={e => updateListItem('steps', idx, 'description', e.target.value)}
                            className="w-full bg-slate-950/50 border border-slate-800 p-2 rounded text-xs text-slate-300 h-20 focus:border-amber-500 outline-none"
                            placeholder="Description..."
                          />
                          <div>
                            <input 
                              value={step.media || ''} 
                              onChange={e => updateListItem('steps', idx, 'media', e.target.value)}
                              className="w-full bg-slate-950/30 border border-slate-800 p-2 rounded text-[10px] font-mono text-slate-400 focus:text-white focus:border-amber-500 outline-none"
                              placeholder="/images/example.gif or https://..."
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* --- TAB: DRILLS --- */}
                {activeTab === 'drills' && (
                  <div className="space-y-4">
                    <Button onClick={() => addListItem('drills', { id: Date.now(), title: "New Drill", xp: 50, duration: "5m", description: "", steps: [] })} size="sm" variant="ghost" className="w-full border-dashed border-slate-700 text-slate-500">
                      <Plus size={14} className="mr-2"/> Add Drill
                    </Button>

                    {formData.drills?.map((drill: any, idx: number) => (
                      <div key={idx} className="bg-slate-900/50 border border-slate-700 p-4 rounded-lg relative">
                         <button onClick={() => removeListItem('drills', idx)} className="absolute right-2 top-2 p-1 text-slate-500 hover:text-red-400"><Trash2 size={14}/></button>
                         
                         <div className="space-y-3">
                           <input 
                             value={drill.title} 
                             onChange={e => updateListItem('drills', idx, 'title', e.target.value)}
                             className="w-full bg-transparent font-serif text-amber-100 border-b border-slate-700 focus:border-amber-500 outline-none" 
                             placeholder="Drill Title"
                           />
                           <div className="grid grid-cols-2 gap-2">
                             <input type="number" value={drill.xp} onChange={e => updateListItem('drills', idx, 'xp', Number(e.target.value))} className="bg-slate-950 p-2 rounded text-xs text-slate-300" placeholder="XP" />
                             <input value={drill.duration} onChange={e => updateListItem('drills', idx, 'duration', e.target.value)} className="bg-slate-950 p-2 rounded text-xs text-slate-300" placeholder="Duration" />
                           </div>
                           <textarea value={drill.description} onChange={e => updateListItem('drills', idx, 'description', e.target.value)} className="w-full bg-slate-950 p-2 rounded text-xs text-slate-300 h-16" placeholder="Drill description..." />
                           
                           {/* Media Input for Drill */}
                           <div>
                            <input 
                              value={drill.media || ''} 
                              onChange={e => updateListItem('drills', idx, 'media', e.target.value)}
                              className="w-full bg-slate-950/30 border border-slate-800 p-2 rounded text-[10px] font-mono text-slate-400 focus:text-white focus:border-amber-500 outline-none"
                              placeholder="/images/drill_example.gif or https://..."
                            />
                          </div>

                           {/* Nested Steps for Drill */}
                           <div className="space-y-2 pt-2 border-t border-slate-800">
                             <div className="flex justify-between items-center">
                               <label className="text-[10px] uppercase text-slate-500">Drill Steps</label>
                               <button onClick={() => addDrillStep(idx)} className="text-[10px] text-amber-500 flex gap-1 items-center hover:text-white"><Plus size={10}/> Add</button>
                             </div>
                             {(drill.steps || []).map((step: string, sIdx: number) => (
                               <div key={sIdx} className="flex gap-2 items-center">
                                 <span className="text-slate-600 text-[10px] w-4">{sIdx + 1}.</span>
                                 <input 
                                   value={step} 
                                   onChange={e => updateDrillStep(idx, sIdx, e.target.value)}
                                   className="flex-1 bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-300 focus:border-amber-500 outline-none"
                                 />
                                 <button onClick={() => removeDrillStep(idx, sIdx)} className="text-slate-600 hover:text-red-400"><X size={12}/></button>
                               </div>
                             ))}
                           </div>
                         </div>
                      </div>
                    ))}
                  </div>
                )}

              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-700">
                <p>Select a node or click + to create new</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Live Preview */}
        <div className="col-span-6 bg-slate-900 relative flex flex-col h-full border-l border-slate-800">
          <div className="p-4 border-b border-slate-800 bg-void flex justify-between items-center shadow-md z-10">
            <h2 className="text-sm font-serif text-slate-400 uppercase tracking-widest flex gap-2 items-center">
              <Eye size={14} /> Preview
            </h2>
            <div className="flex gap-2 bg-slate-800 rounded p-1">
              <button onClick={() => setPreviewView('lesson')} className={`px-2 py-1 text-xs rounded ${previewView === 'lesson' ? 'bg-slate-600 text-white' : 'text-slate-400'}`}>Lesson</button>
              <button onClick={() => setPreviewView('map')} className={`px-2 py-1 text-xs rounded ${previewView === 'map' ? 'bg-slate-600 text-white' : 'text-slate-400'}`}>Map</button>
            </div>
            {previewView === 'lesson' && (
              <div className="flex gap-2 bg-slate-800 rounded p-1 ml-2">
                <button onClick={() => setPreviewMode('desktop')} className={`p-1 rounded ${previewMode === 'desktop' ? 'bg-slate-600 text-white' : 'text-slate-400'}`}><div className="w-4 h-3 border border-current rounded-sm" /></button>
                <button onClick={() => setPreviewMode('mobile')} className={`p-1 rounded ${previewMode === 'mobile' ? 'bg-slate-600 text-white' : 'text-slate-400'}`}><Smartphone size={14} /></button>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto bg-[url('/noise.png')] bg-repeat relative">
            <div className="absolute inset-0 bg-black/50 pointer-events-none" />
            
            {previewView === 'map' ? (
              // --- MAP PREVIEW MODE ---
              <div 
                className="relative w-full h-[200%] bg-void cursor-crosshair overflow-hidden"
                onClick={handleMapClick}
              >
                 {/* 1. Grid Background for Reference */}
                 <div className="absolute inset-0 opacity-10 pointer-events-none" 
                      style={{ backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '5% 5%' }} 
                 />

                 <div className="absolute top-4 left-4 z-50 bg-slate-900/80 p-2 rounded border border-slate-700 pointer-events-none text-xs text-slate-400">
                    <p><MousePointerClick size={12} className="inline mr-1"/> Click anywhere to set position</p>
                    <p className="mt-1 font-mono text-amber-500">X: {formData.position?.x}%  Y: {formData.position?.y}%</p>
                 </div>

                 {/* 2. Connectors Layer */}
                 <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    {/* Existing Nodes Connectors */}
                    {nodes.map(node => {
                       if (!node.data.requires || node.data.requires.length === 0) return null;
                       return node.data.requires.map((reqId: string) => {
                         const reqCoords = findNodeCoords(reqId);
                         if (!reqCoords) return null;
                         return (
                           <MapConnector
                             key={`${reqId}-${node.id}`}
                             startX={reqCoords.x}
                             startY={reqCoords.y}
                             endX={node.data.position.x}
                             endY={node.data.position.y}
                             status="unlocked"
                           />
                         );
                       });
                    })}
                    
                    {/* Ghost Node Connectors (Incoming) */}
                    {(formData.requires || []).map((reqId: string) => {
                       const reqCoords = findNodeCoords(reqId);
                       if (!reqCoords) return null;
                       return (
                         <MapConnector
                           key={`ghost-req-${reqId}`}
                           startX={reqCoords.x}
                           startY={reqCoords.y}
                           endX={formData.position.x}
                           endY={formData.position.y}
                           status="locked" // Dashed line for preview
                         />
                       );
                    })}
                 </svg>

                 {/* 3. Existing Nodes */}
                 {nodes.map((node) => {
                    // Don't render the node we are editing (we render the live ghost instead)
                    if (node.id === editId) return null; 

                    return (
                      <div key={node.id} className="opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                        <MapNode
                          id={node.id}
                          type={node.data.type}
                          title={node.title}
                          x={node.data.position.x}
                          y={node.data.position.y}
                          status="completed" // Show all as completed/visible for context
                          onClick={() => handleSelect(node)} // Allow selecting other nodes from map
                        />
                      </div>
                    );
                 })}

                 {/* 4. Ghost Node (Current Edit) */}
                 <div className="animate-pulse">
                    <MapNode
                      id={editId || "new"}
                      type={formData.type as NodeType}
                      title={editTitle || "New Node"}
                      x={formData.position.x}
                      y={formData.position.y}
                      status="active"
                      onClick={() => {}}
                    />
                 </div>
              </div>
            ) : (
              // --- LESSON PREVIEW MODE ---
              <div className={`relative mx-auto transition-all duration-300 ${previewMode === 'mobile' ? 'w-[375px] my-8 border-x-8 border-y-[40px] border-slate-800 rounded-[3rem] shadow-2xl bg-void overflow-hidden min-h-[800px]' : 'w-full min-h-full bg-void'}`}>
                
                <div className="absolute top-0 w-full z-10">
                  <RuneTablet hotkeys={previewData.hotkeys || []} />
                </div>

                <div className={`px-6 pt-20 pb-20 ${previewMode === 'mobile' ? 'overflow-y-auto h-full' : ''}`}>
                  <div className="mb-8 border-b border-slate-800 pb-6">
                    <span className="text-amber-500 text-xs font-mono tracking-widest block mb-2">XP REWARD: {previewData.xpReward}</span>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-100 mb-4">{previewData.title}</h1>
                    <div className="text-lg text-slate-400 font-light leading-relaxed">
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                          strong: ({node, ...props}) => <span className="text-amber-400 font-bold" {...props} />,
                        }}
                      >
                        {previewData.description}
                      </ReactMarkdown>
                    </div>
                  </div>

                  <div className="space-y-12">
                    {previewData.steps?.map((step: any, index: number) => (
                      <div key={index} className="relative pl-6 border-l-2 border-slate-800">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-void border-2 border-slate-700" />
                        <h2 className="text-xl font-serif text-amber-500 mb-2">{step.title}</h2>
                        <div className="prose prose-invert prose-sm text-slate-300">
                          <ReactMarkdown 
                            remarkPlugins={[remarkGfm]}
                            components={{
                              strong: ({node, ...props}) => <span className="text-amber-400 font-bold" {...props} />,
                              a: ({node, ...props}) => <a className="text-amber-500 hover:text-amber-400 underline" target="_blank" rel="noopener noreferrer" {...props} />,
                              code: ({node, ...props}) => <code className="bg-slate-800 px-1 py-0.5 rounded text-amber-200 font-mono text-sm" {...props} />,
                              ul: ({node, ...props}) => <ul className="list-disc pl-4 space-y-1" {...props} />,
                              ol: ({node, ...props}) => <ol className="list-decimal pl-4 space-y-1" {...props} />,
                            }}
                          >
                            {step.description}
                          </ReactMarkdown>
                        </div>
                        {step.media && <MediaFrame src={step.media} title={step.title} />}
                      </div>
                    ))}
                  </div>

                  <div className="mt-16 pt-8 border-t border-slate-800 text-center">
                    <p className="text-slate-500 font-serif italic mb-6 text-sm">"Is the Trial complete?"</p>
                    <HoldButton onSuccess={() => {}} label="Hold to Complete" />
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}