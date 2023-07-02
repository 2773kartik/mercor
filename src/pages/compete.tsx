import Footer from "~/components/footer";
import Navbar from "~/components/navbar";

export default function Compete(){

    return (
        <div>
        <Navbar />
        <div className="text-black flex flex-col justify-center items-center">
            <div className="font-serif text-3xl text-center">
            Coming Soon ...
            </div>
            <div className=" font-serif text-xl text-center">
            Contact us to organize an event.
            </div>
        </div>
        <Footer />
        </div>

    )
}