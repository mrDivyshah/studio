
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, CalendarDays, MapPin } from 'lucide-react';

export interface Job {
  id: string;
  title: string;
  description: string;
  companyName: string;
  companyLogoUrl: string;
  companyLogoHint: string;
  postedDate: string; // e.g., "1 Day Ago"
  jobType: string; // e.g., "Full-time"
  location: string; // e.g., "Remote"
  applyUrl: string;
}

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Card className="bg-card text-card-foreground shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full rounded-lg border border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
          {job.title}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground pt-1 line-clamp-2">
          {job.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-3 text-sm text-muted-foreground">
        <div className="flex items-center">
          <CalendarDays className="h-4 w-4 mr-2 text-primary/70" />
          <span>{job.postedDate}</span>
          <span className="mx-2">·</span>
          <span>{job.jobType}</span>
        </div>
      </CardContent>
      <CardFooter className="pt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center">
          <div className="relative w-8 h-8 mr-2 rounded-sm overflow-hidden">
            <Image
              src={job.companyLogoUrl}
              alt={`${job.companyName} logo`}
              data-ai-hint={job.companyLogoHint}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{job.companyName}</p>
            <p className="text-xs text-muted-foreground">{job.location}</p>
          </div>
        </div>
        <Button asChild variant="outline" size="sm" className="w-full sm:w-auto text-primary border-primary hover:bg-primary hover:text-primary-foreground">
          <Link href={job.applyUrl}>Apply Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
