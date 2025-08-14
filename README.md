
# Triangle Angle Visualizer

This project is a React + Vite + TypeScript app that lets users input three points and visually displays the triangle they form, including the calculated angles at each vertex. The triangle and its angles are drawn on an HTML5 canvas, and the angle values are shown near each vertex.

---

## Why did you choose this particular drawing to use?

The canvas approach was chosen because it provides full control over custom graphics, such as drawing lines, arcs, and placing text at precise locations. This flexibility is essential for visualizing geometric concepts like triangles and their angles, which would be difficult to achieve with standard HTML/CSS alone.

## How did you calculate the value?

The value of each angle is calculated using the dot product formula for vectors:

- For each vertex A, the vectors AB and AC are computed (where B and C are the other two points).
- The angle at A is then calculated as:

  ```
  θ = arccos( (AB · AC) / (|AB| * |AC|) )
  ```

This gives the angle in radians, which is then converted to degrees for display.

## What was the challenge in the exercise?

The main challenges were:

- Correctly parsing and mapping user input from the form to the canvas drawing.
- Accurately calculating the angles for any triangle, including edge cases (e.g., colinear points).
- Positioning the angle labels so they are readable and do not overlap the triangle, especially for acute or obtuse angles.
- Drawing arcs that visually represent the angles at each vertex.

## Did you succeed in solving it? If not, what difficulties did you have?

Yes, the solution works as intended. The triangle is drawn based on user input, the angles are calculated and displayed, and the UI is responsive to different triangle shapes. Some minor difficulties included:

- Ensuring the angle labels are always outside the triangle and do not overlap with the triangle or each other.
- Handling floating-point precision and edge cases for degenerate triangles.

## Did you use any external aids (including AI)? If yes, what kind of help was it?

Yes, AI assistance (GitHub Copilot) was used to:

- Suggest code for drawing on the canvas and calculating angles.
- Provide ideas for positioning labels and drawing arcs.
- Help debug and refine the logic for edge cases.

Additionally, standard web documentation (MDN) was referenced for canvas API usage and vector math.

---

## Getting Started

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the development server:
   ```sh
   npm run dev
   ```
3. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

This project was bootstrapped with [Vite](https://vitejs.dev/) and uses [React Router](https://reactrouter.com/).
