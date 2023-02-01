import React, {useRef, useEffect} from 'react';

const Canvas = () => {

  //VELIKOST CANVAS
  const width = 400;
  const height = 900;

  //FUNKCE MISTO "document.querySelector"
  const canvas = useRef();
  useEffect(() => {
    const context = canvas.current.getContext('2d');
    drawing(context);
  });

  //RANDOM RANGE NUMBER FUNKCE
  const randomRange = (min, max) => {
    return (Math.random() * (max-min)) + min;
  }
  console.log(randomRange(0, width));

  //CLASSES
  class Vector {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  
    getDistance(v) {
      const dx = this.x - v.x;
      const dy = this.y - v.y;
      return Math.sqrt(dx * dx + dy * dy);
    }
  }
  
  class Agent {
    constructor(x, y) {
      this.pos = new Vector(x, y);
      this.vel = new Vector(randomRange(-1, 1), randomRange(-1, 1));
      this.radius = randomRange(3, 22);
    }
  
    bounce(width, height) {
      if (this.pos.x <= 0 || this.pos.x >= width)  this.vel.x *= -1;
      if (this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1;
    }
  
    update() {
      this.pos.x += this.vel.x;
      this.pos.y += this.vel.y;
    }
  
    draw(context) {
      context.save();
      context.translate(this.pos.x, this.pos.y);
  
      context.lineWidth = 3;
      context.strokeStyle = "white";
      context.beginPath();
      context.arc(0, 0, this.radius, 0, Math.PI * 2);
      context.fill();
      context.stroke();
  
      context.restore();
    }
  }

  //LOOP PRO RANDOM POZICI
  const agents = [];
  for (let i = 0; i < 30; i++ ) {
    const x = randomRange(0, width);
    const y = randomRange(0, height);
    agents.push(new Agent(x, y));
  }
  
  //CONTEXT PARAMETRY
  const drawing = context => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    //FUNKCE ANIMACE
    let animate = () => {
      requestAnimationFrame(animate);
      context.clearRect(0, 0, width, height);                 //vymaže canvas po každem stepu

      
    for (let i = 0; i < agents.length; i++) {
			const agent = agents[i];

			for (let j = i + 1; j < agents.length; j++) {
				const other = agents[j];

        //funkce pro vzdalenost mezi poyicemu
				const dist = agent.pos.getDistance(other.pos);      

				if (dist > 150) continue;
        //funkce pro měnění tloušťky čar
        let lineFunction = (distance, max) => {
          return ((max - distance) + 1 )/ max * 5;
        }

        context.lineWidth = lineFunction(dist, 150);
        context.strokeStyle = "rgba(255, 255, 210, 0.6)";

				context.beginPath();
				context.moveTo(agent.pos.x, agent.pos.y);
				context.lineTo(other.pos.x, other.pos.y);
				context.stroke();

			}
		}

      agents.forEach(agent => {
        agent.update();
        agent.draw(context);
        agent.bounce(width, height);
      });
    };
    animate();  
  };

  return ( 
    <div 
    style={{
      background: "black",
      position: "absolute",
      zIndex: "-1",
      }}>
      <canvas ref={canvas} height={height} width={width} />
    </div>
  );
};

export default Canvas;