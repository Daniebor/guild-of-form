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
            media: "/images/ch1/orbit.gif"
          },
          {
            title: "II. The Pan",
            description: "Hold **Alt** and **Right Click Drag**. The world slides before your eyes.",
            media: "/images/ch1/pan.gif"
          },
          {
            title: "III. The Zoom",
            description: "Hold **Ctrl** and **Right Click Drag**. Pull down to zoom in, push up to zoom out.",
            media: "/images/ch1/zoom.gif"
          },
          {
            title: "IV. The Anchor",
            description: "While rotating, press **Shift** to snap the view to a perfect Front or Side angle. This is your anchor in the chaos.",
            media: "/images/ch1/snap.gif"
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
        description: "Displace matter with intention. Learn ZAdd vs ZSub.",
        position: { x: 50, y: 75 },
        xpReward: 75,
        requires: ["boss-1"],
        hotkeys: ["Alt", "S"],
        steps: [
            { title: "I. The Size", description: "Press **S** to change Draw Size. Keep your focus on the model." },
            { title: "II. The Touch", description: "Lightly stroke the sphere. Notice how the clay builds up (**ZAdd**)." },
            { title: "III. The Inversion", description: "Hold **Alt** while stroking. The clay is pushed inward (**ZSub**)." }
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
        steps: [
          { title: "I. The Summoning", description: "Press **B** then **M** then **V**. This selects the Move Brush." },
          { title: "II. The Silhouette", description: "Rotate so the area you want to change is on the edge. Move works best from the side." },
          { title: "III. The Pull", description: "Make your brush large. Grab the edge and stretch the sphere into a bean shape." }
        ]
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
        steps: [
          { title: "I. The Summoning", description: "Press **B** then **C** then **B** for Clay Buildup." },
          { title: "II. The Strips", description: "Apply strokes in directional strips, like laying real clay. Don't scribble." },
          { title: "III. The Mass", description: "Use this brush to build major forms like the nose or brow ridge." }
        ]
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
        steps: [
          { title: "I. The Summoning", description: "Press **B** then **D** then **S** for DamStandard." },
          { title: "II. The Cut", description: "Draw a line to cut a deep V-groove." },
          { title: "III. The Pinch", description: "Hold **Alt** with DamStandard. Instead of cutting, it pulls geometry into a sharp ridge." }
        ]
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
        steps: [
          { title: "Constraint", description: "Do NOT use Dynamesh. You must manage the stretching using the Smooth brush." },
          { title: "Task 1", description: "Use **Move** to pull the base flat and the head round." },
          { title: "Task 2", description: "Use **Clay Buildup** to add a heavy brow and nose." },
          { title: "Task 3", description: "Use **DamStandard** to cut a deep scar or symbol." }
        ]
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
        hotkeys: ["Shift+F"],
        steps: [
          { title: "I. The Grid", description: "Press **Shift + F** to toggle Polyframe. This reveals the true wireframe." },
          { title: "II. The Stretch", description: "Use the Move brush to pull the mesh hard. Notice how the squares become long rectangles." },
          { title: "III. The Ruin", description: "Try to sculpt on those stretched rectangles. Notice the artifacts. This is why we need the Forge." }
        ]
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
        steps: [
          { title: "I. Activation", description: "Enable Dynamesh in the Geometry palette. Start with Resolution 128." },
          { title: "II. The Gesture", description: "Hold **Ctrl** and **Drag** on the empty background (The Void). This triggers the re-mesh." },
          { title: "III. The Repair", description: "Watch the stretched rectangles turn back into even squares. Now you can sculpt again." }
        ]
      },
      {
        id: "node-3-3",
        title: "The Flow",
        type: "lesson",
        description: "Sculptris Pro and dynamic tessellation.",
        position: { x: 70, y: 52 },
        xpReward: 100,
        requires: ["boss-2"],
        hotkeys: ["\\", "B", "S", "H"],
        steps: [
          { title: "I. The Torch", description: "Press **\\** (Backslash) to toggle Sculptris Pro mode. Triangles are added under your brush." },
          { title: "II. SnakeHook", description: "Select **SnakeHook** (B S H). Pull a tendril out of the mesh." },
          { title: "III. Relativity", description: "The density depends on brush size. Zoom in for details, Zoom out for big shapes." }
        ]
      },
      {
        id: "node-3-4",
        title: "The Cycle",
        type: "lesson",
        description: "The Hybrid workflow: Chaos into Order.",
        position: { x: 50, y: 42 },
        xpReward: 100,
        requires: ["node-3-2", "node-3-3"],
        steps: [
          { title: "I. Chaos", description: "Use Sculptris Pro to rapidly grow limbs and rough shapes. Ignore the messy triangles." },
          { title: "II. Freeze", description: "Use Dynamesh (`Ctrl+Drag`) to solidify the form into a uniform grid." },
          { title: "III. Refine", description: "Now that the mesh is clean, use the Smooth brush to polish the surface." }
        ]
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
        steps: [
          { title: "Task 1: The Puddle", description: "Create a base puddle shape." },
          { title: "Task 2: The Reach", description: "Use SnakeHook to pull a main body rising up." },
          { title: "Task 3: Tendrils", description: "Grow 3 long, twisting arms." },
          { title: "Task 4: Fusion", description: "Loop one arm back into the body and Dynamesh to fuse them together." }
        ]
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
        hotkeys: ["Ctrl"],
        steps: [
          { title: "I. The Paint", description: "Hold **Ctrl** to paint a mask. Dark areas are protected." },
          { title: "II. The Blur", description: "**Ctrl + Click** on the mesh to soften the mask edge." },
          { title: "III. The Invert", description: "**Ctrl + Click** on the background to invert the mask." },
          { title: "IV. The Clear", description: "**Ctrl + Drag** on the background to clear the mask." }
        ]
      },
      {
        id: "node-4-2",
        title: "The Sectors",
        type: "lesson",
        description: "Polygroups and visibility.",
        position: { x: 75, y: 30 },
        xpReward: 100,
        requires: ["boss-3"],
        hotkeys: ["Ctrl+W", "Ctrl+Shift+Click"],
        steps: [
          { title: "I. Group Masked", description: "Mask an area, then press **Ctrl + W**. It becomes a new Polygroup color." },
          { title: "II. Selection", description: "Hold **Ctrl + Shift** and click a color group to hide everything else." },
          { title: "III. Inverse Selection", description: "**Ctrl + Shift + Click** on the background to invert visibility." }
        ]
      },
      {
        id: "node-4-3",
        title: "The Hierarchy",
        type: "lesson",
        description: "Subtools: A body is many stones.",
        position: { x: 50, y: 26 },
        xpReward: 100,
        requires: ["node-4-1", "node-4-2"],
        hotkeys: ["Alt+Click"],
        steps: [
          { title: "I. The Stack", description: "Open the Subtool menu. This is your layer stack." },
          { title: "II. The Eye", description: "Click the Eye icon to hide/show specific parts." },
          { title: "III. Rapid Switch", description: "Hold **Alt** and click directly on a mesh part to select that Subtool instantly." }
        ]
      },
      {
        id: "node-4-4",
        title: "The Anchor",
        type: "lesson",
        description: "Mastering the Gizmo pivot.",
        position: { x: 30, y: 22 },
        xpReward: 100,
        requires: ["node-4-3"],
        hotkeys: ["W", "Alt"],
        steps: [
          { title: "I. The Gizmo", description: "Press **W** to activate the Gizmo 3D." },
          { title: "II. The Soul", description: "Hold **Alt** (Unlock) to move the Gizmo without moving the object. Place it at the joint (e.g., shoulder)." },
          { title: "III. The Reset", description: "If the Gizmo is crooked, **Alt + Click** the Refresh/Circle arrow to reset orientation." },
          { title: "IV. The Center", description: "Click the 'Map Marker' icon to jump the Gizmo to the center of the mesh." }
        ]
      },
      {
        id: "node-4-5",
        title: "The Legion",
        type: "lesson",
        description: "Appending and Inserting new matter.",
        position: { x: 70, y: 22 },
        xpReward: 100,
        requires: ["node-4-4"],
        hotkeys: ["Ctrl+Drag"],
        steps: [
          { title: "I. Append", description: "Use `Subtool > Append` to add a new primitive (Sphere/Cube). It appears at world center." },
          { title: "II. Positioning", description: "Immediately use the Gizmo (**W**) to move the new part into place." },
          { title: "III. Duplication", description: "With Gizmo active, hold **Ctrl** and drag an arrow to create a duplicate instantly." }
        ]
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
        steps: [
          { title: "Task 1: The Forging", description: "Append a Ring3D. Duplicate it and rotate to create a chain of 3 links." },
          { title: "Task 2: The Break", description: "Mask half of the middle link and rotate it open." },
          { title: "Task 3: The Glow", description: "Use **Ctrl+W** to turn the broken link a different color (Polygroup)." }
        ]
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
        hotkeys: ["X"],
        steps: [
          { title: "I. L.Sym", description: "Activate 'Local Symmetry' in the Transform palette if your object is off-center." },
          { title: "II. Mirror and Weld", description: "Go to `Geometry > Modify Topology`. Click **Mirror And Weld**. It copies Left (X) to Right." },
          { title: "III. The Axis", description: "Ensure you are working on the correct side (usually the Left side of the screen)." }
        ]
      },
      {
        id: "node-5-2",
        title: "The Calculator",
        type: "lesson",
        description: "Live Booleans: Math made visible.",
        position: { x: 75, y: 10 },
        xpReward: 125,
        requires: ["boss-4"],
        steps: [
          { title: "I. Operators", description: "In the Subtool list, click the second circle icon (Subtraction) on your cutter object." },
          { title: "II. Preview", description: "Turn on the **Live Boolean** button (Top Left). You should see the hole appear." },
          { title: "III. Bake", description: "To finalize, go to `Subtool > Boolean > Make Boolean Mesh`. This creates a new Tool." }
        ]
      },
      {
        id: "node-5-3",
        title: "The Bender",
        type: "lesson",
        description: "Gizmo Deformers: Bending steel.",
        position: { x: 50, y: 6 },
        xpReward: 125,
        requires: ["node-5-1", "node-5-2"],
        hotkeys: ["W"],
        steps: [
          { title: "I. The Gear", description: "Activate Gizmo (**W**). Click the small **Gear Icon** on top of the Gizmo." },
          { title: "II. Bend Arc", description: "Select **Bend Arc**. Use the cones to bend the geometry smoothly." },
          { title: "III. Accept", description: "Click the Gear again and select **Accept** to apply the change." }
        ]
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
        steps: [
          { title: "Task 1: The Core", description: "Block out the Torso and Hips using primitive shapes." },
          { title: "Task 2: The Socket", description: "Use **Live Booleans** to cut a perfect socket for the shoulder joint." },
          { title: "Task 3: The Armor", description: "Use **Bend Arc** to curve a cube into a shoulder pad." },
          { title: "Task 4: The Mirror", description: "Build one side completely, then use **Mirror and Weld** to complete the Golem." }
        ]
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