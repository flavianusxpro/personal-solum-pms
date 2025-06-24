'use client';
import { useGetApiConnection } from '@/hooks/useConnection';

export default function ConnectionApi() {
  const { data } = useGetApiConnection();
  return <>API</>;
}
