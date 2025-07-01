import React from "react";
import { PhotoIcon2 } from "../icons";

function AddPicture({file, setFile}) {

  const hdlFileChange = (e) => {
    console.dir(e.target)
    console.dir(e.target.files[0]);
    setFile(e.target.files[0]); //เก็บไฟล์ที่เลือกไว้ใน state
    console.log(URL.createObjectURL(e.target.files[0])); //แสดงไฟล์ที่เลือก
  }

  const removePic = (e) => {
    e.stopPropagation() //คลิกปุ่ม X จะไม่ทำให้ div ที่มีรูปภาพถูกคลิก(ด้านหลัง)
    document.getElementById("input-file").value = ""; //ลบไฟล์ที่เลือก //ลบไฟล์ที่เลือกใน input file (ค้าง ใน hdlFileChange and เลือกรูปเดิทไม่ได้)
    setFile(null); //ลบไฟล์ที่เก็บไว้ใน state
  }
  return (
    <div className="flex flex-col p-2 border rounded-lg">
      <div className="bg-slate-100 min-h-40 relative cursor-pointer hover:bg-slate-200"
           onClick={() => document.getElementById("input-file").click()}>
        <input type="file" className="hidden" id="input-file" //multiple //เพิ่มรูปหลายรูปได้
        onChange={hdlFileChange} />
        {file && (
          <>
          <img
            src={URL.createObjectURL(file)}
            alt="Selected"
            className="w-full h-full object-cover rounded-lg"
          />
          <button className="btn btn-sm btn-circle btn-error btn-dash absolute top-1 right-0 opacity-50"  onClick={removePic}>X</button>
          </>
        )}
        {!file &&
        <PhotoIcon2 className="w-10 h-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-500 opacity-40" />
        }
      </div>
    </div>
  );
}

export default AddPicture;
