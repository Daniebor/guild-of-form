import { Chapter, CurriculumNode } from "../types";

export const CURRICULUM: Chapter[] = [
  {
    id: "chapter-1",
    title: "Chapter I: The Awakening",
    nodes: [
      {
        id: "node-1-1",
        title: "The Eye",
        type: "lesson",
        description: "Navigation is the first spell. You do not move the camera; you move the world.",
        position: { x: 50, y: 95 },
        xpReward: 50,
        requires: [],
        hotkeys: ["RMB", "Alt", "Ctrl", "Shift"],
        steps: [
          {
            title: "I. The Orbit",
            description: "Click and drag with **Right Mouse Button** on the empty canvas (The Void) to rotate the object. Do not click on the model itself yet.",
          },
          {
            title: "II. The Pan",
            description: "Hold **Alt** and **Right Click Drag**. The world slides before your eyes.",
          },
          {
            title: "III. The Zoom",
            description: "Hold **Ctrl** and **Right Click Drag**. Pull down to zoom in, push up to zoom out.",
          },
          {
            title: "IV. The Anchor",
            description: "While rotating, press **Shift** to snap the view to a perfect Front or Side angle. This is your anchor in the chaos.",
          }
        ]
      },
      {
        id: "node-1-2",
        title: "The Trap",
        type: "lesson",
        description: "Escape the 2.5D dimension.",
        position: { x: 30, y: 90 },
        xpReward: 50,
        requires: ["node-1-1"],
        hotkeys: ["T", "Ctrl+N"],
        steps: [
            { title: "I. The Mistake", description: "If you cannot rotate your model, you have dropped it to the canvas as 2.5D pixels." },
            { title: "II. The Cleanse", description: "Press **Ctrl + N** to clear the canvas of all dead pixels." },
            { title: "III. The Resurrection", description: "Drag your tool out again. Immediately press **T** to enter Edit Mode." }
        ]
      },
      {
        id: "node-1-3",
        title: "The Summoning",
        type: "lesson",
        description: "Retrieve artifacts from the Lightbox.",
        position: { x: 70, y: 90 },
        xpReward: 50,
        requires: ["node-1-2"],
        hotkeys: [","],
        steps: [
            { title: "I. The Portal", description: "Press **,** (Comma) to toggle the Lightbox browser." },
            { title: "II. Project vs Tool", description: "A **Project (.zpr)** saves your camera, lighting, and history. A **Tool (.ztl)** saves only the 3D Object." }
        ]
      },
      {
        id: "boss-1",
        title: "The Watcher",
        type: "boss",
        description: "Prove your vision. Capture the essence of the Soldier.",
        position: { x: 50, y: 82 },
        xpReward: 200,
        requiredXP: 300,
        requires: ["node-1-3"],
        steps: [
            { title: "Briefing", description: "The Watcher demands a specific perspective. You must capture the essence of the 'DemoSoldier' from three distinct angles." },
            { title: "Task 1", description: "Load the DemoSoldier from the Lightbox." },
            { title: "Task 2", description: "Frame a perfect Portrait shot." },
            { title: "Task 3", description: "Zoom in on the boots details." }
        ]
      },
    ],
  },
  {
    id: "chapter-2",
    title: "Chapter II: The First Tools",
    nodes: [
      {
        id: "node-2-1",
        title: "The Touch",
        type: "lesson",
        description: "Displace matter with intention.",
        position: { x: 50, y: 75 },
        xpReward: 75,
        requires: ["boss-1"],
        hotkeys: ["Alt", "S"],
        steps: [
            { title: "I. The Size", description: "Press **S** to change Draw Size." },
            { title: "II. The Inversion", description: "Hold **Alt** to carve into the clay." }
        ]
      },
      {
        id: "node-2-2",
        title: "Shifting Matter",
        type: "lesson",
        description: "Use the Move brush to define silhouette.",
        position: { x: 25, y: 70 },
        xpReward: 75,
        requires: ["node-2-1"],
        hotkeys: ["B", "M", "V"],
      },
      {
        id: "node-2-3",
        title: "Adding Volume",
        type: "lesson",
        description: "Clay Buildup acts as muscle.",
        position: { x: 75, y: 70 },
        xpReward: 75,
        requires: ["node-2-1"],
        hotkeys: ["B", "C", "B"],
      },
      {
        id: "node-2-4",
        title: "The Knife",
        type: "lesson",
        description: "DamStandard cuts the creases.",
        position: { x: 50, y: 65 },
        xpReward: 75,
        requires: ["node-2-2", "node-2-3"],
        hotkeys: ["B", "D", "S"],
      },
      {
        id: "boss-2",
        title: "The Totem",
        type: "boss",
        description: "Sculpt a primitive totem without Dynamesh.",
        position: { x: 50, y: 60 },
        xpReward: 250,
        requiredXP: 400,
        requires: ["node-2-4"],
      },
    ],
  },
  {
    id: "chapter-3",
    title: "Chapter III: Primordial Clay",
    nodes: [
      {
        id: "node-3-1",
        title: "The Limit",
        type: "lesson",
        description: "Understanding polygon stretching.",
        position: { x: 30, y: 52 },
        xpReward: 100,
        requires: ["boss-2"],
      },
      {
        id: "node-3-3",
        title: "The Flow",
        type: "lesson",
        description: "Sculptris Pro and dynamic tessellation.",
        position: { x: 70, y: 52 },
        xpReward: 100,
        requires: ["boss-2"],
      },
      {
        id: "node-3-2",
        title: "The Forge",
        type: "lesson",
        description: "Dynamesh: Alchemy for geometry.",
        position: { x: 50, y: 47 },
        xpReward: 100,
        requires: ["node-3-1"],
        hotkeys: ["Ctrl+Drag"],
      },
      {
        id: "node-3-4",
        title: "The Cycle",
        type: "lesson",
        description: "The Hybrid workflow: Chaos into Order.",
        position: { x: 50, y: 42 },
        xpReward: 100,
        requires: ["node-3-2", "node-3-3"],
      },
      {
        id: "boss-3",
        title: "The Slime",
        type: "boss",
        description: "Create a fluid creature using SnakeHook and Dynamesh.",
        position: { x: 50, y: 37 },
        xpReward: 300,
        requiredXP: 500,
        requires: ["node-3-4"],
      },
    ],
  },
  {
    id: "chapter-4",
    title: "Chapter IV: The Binding",
    nodes: [
      {
        id: "node-4-1",
        title: "The Shadow",
        type: "lesson",
        description: "Masking techniques.",
        position: { x: 25, y: 30 },
        xpReward: 100,
        requires: ["boss-3"],
      },
      {
        id: "node-4-2",
        title: "The Sectors",
        type: "lesson",
        description: "Polygroups and visibility.",
        position: { x: 75, y: 30 },
        xpReward: 100,
        requires: ["boss-3"],
      },
      {
        id: "node-4-3",
        title: "The Hierarchy",
        type: "lesson",
        description: "Subtools: A body is many stones.",
        position: { x: 50, y: 26 },
        xpReward: 100,
        requires: ["node-4-1", "node-4-2"],
      },
      {
        id: "node-4-4",
        title: "The Anchor",
        type: "lesson",
        description: "Mastering the Gizmo pivot.",
        position: { x: 30, y: 22 },
        xpReward: 100,
        requires: ["node-4-3"],
      },
      {
        id: "node-4-5",
        title: "The Legion",
        type: "lesson",
        description: "Appending and Inserting new matter.",
        position: { x: 70, y: 22 },
        xpReward: 100,
        requires: ["node-4-4"],
      },
      {
        id: "boss-4",
        title: "The Spirit Chain",
        type: "boss",
        description: "Forge an interlocking chain of spirit links.",
        position: { x: 50, y: 17 },
        xpReward: 350,
        requiredXP: 600,
        requires: ["node-4-5"],
      },
    ],
  },
  {
    id: "chapter-5",
    title: "Chapter V: Golem's Assembly",
    nodes: [
      {
        id: "node-5-1",
        title: "The Reflection",
        type: "lesson",
        description: "Mirror and Weld geometry.",
        position: { x: 25, y: 10 },
        xpReward: 125,
        requires: ["boss-4"],
      },
      {
        id: "node-5-2",
        title: "The Calculator",
        type: "lesson",
        description: "Live Booleans: Math made visible.",
        position: { x: 75, y: 10 },
        xpReward: 125,
        requires: ["boss-4"],
      },
      {
        id: "node-5-3",
        title: "The Bender",
        type: "lesson",
        description: "Gizmo Deformers: Bending steel.",
        position: { x: 50, y: 6 },
        xpReward: 125,
        requires: ["node-5-1", "node-5-2"],
      },
      {
        id: "boss-5",
        title: "The Stone Golem",
        type: "boss",
        description: "FINAL EXAM: Construct an articulated Guardian.",
        position: { x: 50, y: 2 },
        xpReward: 500,
        requiredXP: 800,
        requires: ["node-5-3"],
      },
    ],
  },
];

export const findNodeById = (nodeId: string): CurriculumNode | null => {
  for (const chapter of CURRICULUM) {
    const node = chapter.nodes.find((n) => n.id === nodeId);
    if (node) return node;
  }
  return null;
};