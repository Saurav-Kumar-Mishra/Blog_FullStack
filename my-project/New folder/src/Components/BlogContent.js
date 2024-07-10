import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

function BlogContent() {
  return (
    <div className="w-screen pt-4">
      <div className="flex  justify-center ">
        {/* For content */}
        <div className="flex flex-col items-center justify-center w-[70%] text-justify p-2 gap-4">
          <h1>
            {" "}
            <span className="font-bold font-mono underline text-3xl decoration-pink-700 underline-offset-4 decoration-">
              Travelling
            </span>{" "}
          </h1>
          <article className="text-slate-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisi
            cras fermentum odio eu feugiat pretium nibh ipsum consequat. Mollis
            aliquam ut porttitor leo a diam sollicitudin. Purus viverra accumsan
            in nisl nisi scelerisque eu ultrices. Varius duis at consectetur
            lorem donec massa. Odio aenean sed adipiscing diam. Risus feugiat in
            ante metus dictum at. Ante in nibh mauris cursus mattis molestie a
            iaculis. Auctor urna nunc id cursus metus aliquam. Et netus et
            malesuada fames ac turpis egestas. Ultrices eros in cursus turpis
            massa tincidunt dui ut ornare. Facilisi nullam vehicula ipsum a
            arcu. Montes nascetur ridiculus mus mauris. Et odio pellentesque
            diam volutpat commodo sed egestas egestas. Blandit volutpat maecenas
            volutpat blandit aliquam etiam erat. Mauris vitae ultricies leo
            integer malesuada nunc vel. Ipsum dolor sit amet consectetur. Ornare
            massa eget egestas purus viverra accumsan. Etiam dignissim diam quis
            enim. Massa massa ultricies mi quis. Tempus imperdiet nulla
            malesuada pellentesque. Amet aliquam id diam maecenas ultricies mi.
            Mattis rhoncus urna neque viverra. Egestas tellus rutrum tellus
            pellentesque eu tincidunt tortor aliquam nulla. Vitae ultricies leo
            integer malesuada nunc vel risus commodo. Lectus sit amet est
            placerat in egestas. Sed libero enim sed faucibus. Nec nam aliquam
            sem et. Quis hendrerit dolor magna eget est lorem ipsum. Sem viverra
            aliquet eget sit amet. Enim nulla aliquet porttitor lacus luctus
            accumsan tortor. Sit amet mattis vulputate enim nulla aliquet.
            Ornare arcu odio ut sem nulla pharetra. Pulvinar sapien et ligula
            ullamcorper malesuada. Eget egestas purus viverra accumsan in nisl.
            Urna molestie at elementum eu facilisis sed. Mi proin sed libero
            enim. Tristique senectus et netus et malesuada fames. Netus et
            malesuada fames ac turpis. Nec ultrices dui sapien eget mi. Cras
            pulvinar mattis nunc sed blandit libero volutpat sed cras. Nisl
            suscipit adipiscing bibendum est ultricies. Tempus urna et pharetra
            pharetra massa massa ultricies mi quis. Tortor vitae purus faucibus
            ornare suspendisse. Sed odio morbi quis commodo odio aenean sed.
            Vitae turpis massa sed elementum tempus egestas sed. Sit amet luctus
            venenatis lectus magna fringilla urna. In hendrerit gravida rutrum
            quisque. Enim eu turpis egestas pretium aenean pharetra magna.
            Semper viverra nam libero justo laoreet sit amet cursus. Gravida
            dictum fusce ut placerat orci. Ultrices neque ornare aenean euismod
            elementum. Senectus et netus et malesuada fames ac turpis. Eleifend
            donec pretium vulputate sapien nec sagittis aliquam malesuada
            bibendum. Mauris ultrices eros in cursus turpis. Venenatis urna
            cursus eget nunc scelerisque viverra. Cursus euismod quis viverra
            nibh cras pulvinar. Adipiscing bibendum est ultricies integer quis
            auctor. Id porta nibh venenatis cras sed felis eget velit aliquet.
            Proin libero nunc consequat interdum varius. Mi sit amet mauris
            commodo quis imperdiet massa tincidunt nunc.
          </article>
          <div className="text-center flex justify-center gap-10">
          <button
          
          className=" text-4xl 
        bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
        >
          <IoIosArrowBack />
        </button>
        <button
         
          className="text-4xl 
        bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
        >
          <IoIosArrowForward />
          </button>
          </div>
        </div>
        {/* About Author */}
        <div className="flex flex-col items-start justify-center mx-4 p-2 text gap-6">
          <p className="text-center font-bold text-xl underline decoration-pink-700 underline-offset-4 decoration-4 ">
            Author
          </p>
          <img className="rounded-xl" src="author.jpg" width="250px" alt="img not found" />
          <p className="font-bold">
            Name :{" "}
            <span className="text-slate-500 font-medium text-sm">
              Kierra Camroon
            </span>{" "}
          </p>
          <p className="font-bold">
            Country :{" "}
            <span className="text-slate-500 font-medium text-sm">
              {" "}
              America{" "}
            </span>{" "}
          </p>
          <p className="font-bold">
            Rating :
            <span className="text-slate-500 font-medium text-sm"> 4.5</span>
          </p>
          <p className="font-bold">
            Email :{" "}
            <a
              href="mailto:KierraCamroon@gmail.com"
              className="text-slate-500 font-medium  text-sm"
            >
              KierraCamroon@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default BlogContent;
