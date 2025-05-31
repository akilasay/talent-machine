"use client";
import React, { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { jobs } from "@/constants";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

const JobFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("job") || "";

    const [job, setJob] = useState(query);

    useEffect(() => {
        let newUrl = "";
        if (job === "all") {
            newUrl = removeKeysFromUrlQuery({
                params: searchParams.toString(),
                keysToRemove: ["job"],
            });
        } else {
            newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: "job",
                value: job,
            });
        }
        router.push(newUrl, { scroll: false });
    }, []);

    return (
        <Select onValueChange={setJob} value={job}>
            <SelectTrigger className="input capitalize">
                <SelectValue placeholder="job" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All jobs</SelectItem>
                {jobs.map((job) => (
                    <SelectItem key={job} value={job} className="capitalize">
                        {job}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default JobFilter;