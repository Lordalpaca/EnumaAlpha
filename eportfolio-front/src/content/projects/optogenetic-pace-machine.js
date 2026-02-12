export default {
  slug: "optogenetic-pace-machine",
  title: "Optogenetic PACE Machine V3",
  description: "A state-of-the-art directed evolution bioreactor that uses light to control genetic expression for cutting-edge immunotherapy development.",
  thumbnail: "/projects/pace-machine/thumbnail.PNG",
  tags: ["Biomedical Engineering", "Arduino", "PCB Design", "Adobe Illustrator", "Altium", "Fusion360"],
  date: "2023",
  content: `
## Overview

Optogenetic Phage Assisted Continuous Evolution (PACE) is an approach for directed evolution that employs light to control the genetic expression of bacteriophage.

![PACE Machine 3D Render](/projects/pace-machine/render.png)

## Why Does It Matter?

The application of this state-of-the-art technology can lead to cutting-edge development of new immunotherapy. This Optogenetic PACE machine allows the process of optogenetic engineering to be **continuously conducted and automated**, reducing human labor — thus saving time and increasing yield.

One application specific to this machine is obtaining **nanobodies**. Nanobodies have high affinity and specificity toward proteins and are compatible with novel pharmacological targets, enabling innovative approaches to cure diseases.

## Problem

Commercial continuous cell culturing systems with multi-culturing units have already been developed. However, the **high cost and rigidity** of functions made them unsuitable for the SurPhACE application.

A prior low-cost model of directed evolution bioreactor with optogenetic controlling was developed, but it could only allow **one turbidostat** to function — leading to limited capacity and complexity for gene and protein production.

Therefore, a new version of open-source directed evolution bioreactor applicable to SurPhACE needed to be developed.

![System Design Draft](/projects/pace-machine/system-draft.jpeg)

## Breadboard Prototyping

I studied how to use MOSFETs to control low power motors with 5V, then developed a breadboard model controlling 5V and 12V for advanced development.

![Breadboard Model](/projects/pace-machine/breadboard.jpeg)

## Protoboard Development

All components were soldered onto a half-size protoboard, resulting in a functioning motorshield.

![Protoboard Assembly](/projects/pace-machine/protoboard.png)

The protoboard motorshield was able to control and distribute appropriate voltage to each component.

## Printed Circuit Board Design

I initially designed the PCB in **Fusion360**:

![Circuit Design on Fusion360](/projects/pace-machine/pcb-schematic.png)

![PCB Routing](/projects/pace-machine/pcb-routing.png)

![Rendered 3D PCB Design](/projects/pace-machine/pcb-render.png)

## Adding Art to the PCB

I wanted to add a personal touch to the PCB design. I created custom artwork in **Adobe Illustrator** and planned to print it onto the board.

![PCB Art Design](/projects/pace-machine/thumbnail.PNG)

Due to the complexity of the art I added, I had to migrate the design from Fusion360 to **Altium** for more powerful processing capabilities. The final result combines both engineering functionality and artistic expression.

![PCB with Art in Altium](/projects/pace-machine/pcb-art.png)

## Final Testing

![Final Testing Setup](/projects/pace-machine/testing.jpeg)

## Technical Skills
- Arduino
- Circuit Design
- Power Distribution
- PCB Design
- Soldering
- Adobe Illustrator
- Fusion360
- Altium
  `
};
