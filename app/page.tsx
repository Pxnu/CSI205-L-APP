"use client";
import stuPic from "./imgs/stdempimg.gif";

export default function Home() {
  return (
    // container
    <div className="p-2">
      <div className="w-full max-w-300 h-auto mx-auto flex flex-col md:flex-row gap-4 border-2 border-gray-500 p-4 rounded-md">
        <div className="card w-full md:w-100 mx-auto shrink-0 relative overflow-hidden border-2 border-gray-500 rounded-md">
          <div className="img w-full">
            <img className="w-full" src={stuPic.src} alt="student-img" />
          </div>
          <div className="w-full py-2 px-4 absolute bottom-0 bg-white-100">
            <div className="header my-2">
              <p className="text-2xl font-bold">Phan Sriboonpeng.</p>
            </div>
            <div className=" capitalize">
              <p>
                <strong>birthday:</strong> 8/4/2006
              </p>
              <p>
                <strong>age:</strong> 20
              </p>
              <p>
                <strong>Studying at university:</strong> sripatum university
              </p>
              <p>
                <strong>major:</strong> Computer Science And Innovative Software
                Developer
              </p>
            </div>
          </div>
        </div>

        <div className="text-base/8">
          <p className="text-balance font-bold text-4xl">
            My Profile In University
          </p>
          <p className="text-balance">
            <strong className="capitalize">UX / UI Design:</strong> I am deeply
            passionate about creating user-centric digital experiences!
            Currently, I am exploring the exciting world of UX/UI design by
            learning the fundamentals of Figma. I love translating creative
            ideas into interactive wireframes and early-stage prototypes, always
            focusing on understanding user behavior to deliver intuitive,
            accessible, and visually appealing interfaces.
          </p>
          <p className="text-balance">
            <strong className="capitalize">html / css / js:</strong> Building
            the core foundation of the web is where I truly thrive! I have
            developed a solid, intermediate-level proficiency in writing
            semantic HTML, crafting highly responsive and dynamic layouts with
            CSS, and bringing static pages to life using JavaScript. I genuinely
            enjoy solving logical challenges, manipulating the DOM, and ensuring
            seamless interactions across all devices.
          </p>
          <p className="text-balance">
            <strong className="capitalize">
              react / typescript / bootstrap / tailwind:
            </strong>{" "}
            I am currently diving headfirst into the modern front-end ecosystem!
            I am actively expanding my capabilities by learning React and
            TypeScript to build scalable, fast, and robust component-based web
            applications. To supercharge my UI development process, I am also
            getting hands-on experience with powerful styling frameworks like
            Tailwind CSS and Bootstrap, eager to push the boundaries of what I
            can build on the web!
          </p>
          <p className="text-balance">
            <strong className="capitalize">My Goals:</strong> My primary
            objective is to become a fully capable{" "}
            <strong>Full-Stack Developer</strong>. In the short term, I aim to
            master modern frontend technologies like{" "}
            <strong>React, TypeScript, and Next.js</strong> while leveraging my{" "}
            <strong>UX/UI design background</strong> to build seamless user
            experiences. Concurrently, I am expanding my skills into backend
            development (Node.js, Express) and database management (SQL/NoSQL).
            My long-term aspiration is to evolve into a Senior Software
            Engineer/Architect, designing scalable, resilient web applications
            and leading innovative tech solutions.
          </p>
        </div>
      </div>
    </div>
  );
}
