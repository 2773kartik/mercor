import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import Navbar from "~/components/navbar";
import Landing from "~/components/landing";
import Footer from "~/components/footer";
import { ChangeEvent, FormEvent, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddSkill() {
    const createSkill = api.skill.create.useMutation();
    const [skill, setSkill] = useState<string>('');
    
    // get all skills to check if skill already exists
    const { data } = api.skill.getApprovedSkills.useQuery();

    const handleAddSkill = (e:FormEvent) => {
        e.preventDefault();
        if(skill==='' || skill===null) {
            toast.warn("Can't have empty skill!");
            return;
        }

        // check if skill already exists
        const skillExists = data?.some( (skillData) => skillData.name == skill.toUpperCase());
        if(skillExists) {
            toast.warn("Skill already exists!");
            return;
        }

        // if skill does not exist, add it to the database
        createSkill.mutate({name:skill.toUpperCase()});
        setSkill('');
        toast.success('Thanks, We will review that!');
    };

    return(
        <div>
            <ToastContainer />
            <Head>
                <title>SkillShow</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <main className="flex justify-center h-full font-">
                <div className="w-full flex flex-col justify-center items-center max-w-2xl bg-white rounded-sm text-black m-2 p-4">
                    <div className="text-xl lg:text-2xl text-bold text-center">
                        Could not find the skill you were looking for?
                    </div>
                    <div className="text-center">
                        Request the skill here! We'll review it and add it to the list.
                    </div>

                    <form className="flex flex-row" onSubmit={handleAddSkill}>
                        <input
                        className="p-2 m-2 text-black border-2 shadow-md rounded outline-none"
                        value={skill}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setSkill(e.target.value)}
                        />
                        <button className="text-bold shadow-md bg-orange-500 w-1/2 mx-auto rounded m-2 p-2">
                        Request Skill
                        </button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>

    );
}