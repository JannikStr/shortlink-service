'use client';
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LinksPage({ params }: { params: { tag: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const tag = params.tag;

  useEffect(() => {
    const fetchUrl = async () => {
      const response = await fetch(`/api/links/${tag}`);
      if(!response.ok) {
        toast({
          'variant': 'destructive',
          'title': 'Short link not found',
          'description': `The short link with tag "${tag}" is not registered.`
        });
        return router.push('/');
      }
      const data = await response.json();
      router.replace(data.url);
    }

    fetchUrl();
  }, [router, tag, toast]);

  return (
    <div className="text-white text-center mt-5">
      <h1>Loading...</h1>
    </div>
  );
}
