import React, { createContext, ReactNode, useContext, useState } from 'react';

export type Proposal = {
  id: string;
  jobId: string;
  jobTitle: string;
  coverLetter: string;
  bidAmount: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  submittedAt: string;
};

type ProposalsContextType = {
  proposals: Proposal[];
  addProposal: (proposal: Omit<Proposal, 'id' | 'status' | 'submittedAt'>) => void;
  hasAppliedToJob: (jobId: string) => boolean;
};

const ProposalsContext = createContext<ProposalsContextType | undefined>(undefined);

const STATUSES: Proposal['status'][] = ['Pending', 'Accepted', 'Rejected'];

export function ProposalsProvider({ children }: { children: ReactNode }) {
  const [proposals, setProposals] = useState<Proposal[]>([]);

  const addProposal = (proposal: Omit<Proposal, 'id' | 'status' | 'submittedAt'>) => {
    const newProposal: Proposal = {
      ...proposal,
      id: 'p' + Date.now(),
      status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
      submittedAt: 'Just now',
    };
    setProposals((prev) => [newProposal, ...prev]);
  };

  const hasAppliedToJob = (jobId: string) => proposals.some((p) => p.jobId === jobId);

  return (
    <ProposalsContext.Provider value={{ proposals, addProposal, hasAppliedToJob }}>
      {children}
    </ProposalsContext.Provider>
  );
}

export function useProposals() {
  const context = useContext(ProposalsContext);
  if (!context) {
    throw new Error('useProposals must be used within a ProposalsProvider');
  }
  return context;
}