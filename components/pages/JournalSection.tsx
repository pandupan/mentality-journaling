"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


const getRandomColor = () => {
  // Generate a random color in hex format
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const JournalSection = () => {
  
  const [date, setDate] = React.useState<Date>();
  const [diaryEntries, setDiaryEntries] = React.useState<
    { title: string; date: string; description: string; color: string }[]
  >([]);

  React.useEffect(() => {
    const storedEntries = localStorage.getItem("diaryEntries");
    setDiaryEntries(storedEntries ? JSON.parse(storedEntries) : []);
  }, []); // Empty dependency array ensures that this effect runs only once on mount

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  
    // Get the input values
    const inputText = (event.target as any).elements.inputText.value;
    const textareaText = (event.target as any).elements.textareaText.value;
  
    // Validate and save the new entry
    if (inputText && textareaText) {
      const newEntry = {
        title: inputText,
        date: format(date!, "PPP"),
        description: textareaText,
        color: getRandomColor(),
      };
  
      const newEntries = [...diaryEntries, newEntry];
      setDiaryEntries(newEntries);
  
      // Update localStorage with the new entries
      localStorage.setItem("diaryEntries", JSON.stringify(newEntries));
  
      // Clear the form
      setDate(undefined);
      (event.target as any).reset();
    }
  };
  

  const handleDeleteEntry = (index: number) => {
    const updatedEntries = [...diaryEntries];
    updatedEntries.splice(index, 1);
    setDiaryEntries(updatedEntries);
    localStorage.setItem("diaryEntries", JSON.stringify(updatedEntries));
  };

  return (
    <div className="flex flex-col w-full min-h-full gap-4 px-8 py-20 bg-[#f5f4f0] ">
      <div className="flex flex-col justify-center items-center ">
        <h1 className="text-4xl font-bold">
          Kamu Dapat Mencurahkan Seisi hatimu disini 😉
        </h1>
      </div>
      <div className="flex w-full justify-between gap-4 p-8 ">
        <div className="w-1/2 h-full flex justify-center items-center bg-sky-400 rounded-lg">
          <div className="w-full h-full p-4 rounded-md border-sky-400 border-2">
            <form
              className="w-full flex justify-center gap-6 flex-col"
              onSubmit={handleFormSubmit}
            >
              <h2 className="font-bold text-xl">
                Ur Daily Diary is Here !! 💕
              </h2>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "max-w-[280px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
              <Input name="inputText" placeholder="Apa yang ingin kamu ceritakan?" />
              <Textarea
                name="textareaText"
                cols={30}
                rows={10}
                placeholder="Write ur thought heree..."
              />
              <Button type="submit">Submit</Button>
            </form>
          </div>
        </div>
        <div className="w-1/2 h-full overflow-y-auto">
          <div className="w-full max-h-[500px] flex justify-center flex-wrap gap-4">
            {diaryEntries.map((entry, index) => (
              <Card key={index} className="w-[250px] min-h-[300px] border-2 justify-between" style={{ backgroundColor: entry.color, borderColor: entry.color }}>
                <CardHeader className="space-y-4">
                  <CardTitle>{entry.title}</CardTitle>
                  <CardDescription>{entry.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{entry.description}</p>
                </CardContent>
                <CardFooter className="place-content-end">
                  <Button onClick={() => handleDeleteEntry(index)} className="bg-red-500">
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <h1 className="text-3xl font-semibold mx-auto">
      Keep Remeber &quot;You are not alone, don&quot;t give up&quot;
      </h1>
    </div>
  );
};

export default JournalSection;
