// pages/Bounties.tsx
import { motion } from "framer-motion";
import {

  CalendarDays,
  Link2,
  ClipboardList,
  BadgeCheck,

} from "lucide-react";
import { Card } from "@components/ui/Card";
import { Button } from "@components/ui/button";
import Header from "@components/Header";
import {
  fetchBounties,
  bountyApplication,
  getAppliedBounties,
  cancelBountyApplication,
  bountySubmission,
} from "../services/bountyServcies";
import { AppliedBounty, Bounty } from "../types/bounties";
import { useEffect, useState } from "react";
import { Storage } from "@utils/storage";
import { useStore } from "@context/useStore";
import BountyHeader from "@components/BountyHeader";

export default function Bounties() {
  const courseId = Storage.get("selectedCourseId");
  const { setBounties, bounties } = useStore();
  const [appliedBounties, setAppliedBounties] = useState<AppliedBounty[]>([]);
  const [openFormId, setOpenFormId] = useState<string | null>(null);
  const [notes, setNotes] = useState<string>("");
  const [submittedLink, setSubmittedLink] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const refreshAllData = async () => {
    setIsLoading(true);
    setError(null);
    
      const [allResponse, appliedResponse] = await Promise.all([
        fetchBounties(courseId),
        getAppliedBounties(courseId),
      ]);
      setBounties(allResponse);
      setAppliedBounties(Array.isArray(appliedResponse) ? appliedResponse : [appliedResponse]);
 
      setIsLoading(false);
    
  };


  useEffect(() => {
    if (courseId) refreshAllData();
  }, [courseId]);

  const handleBountyApplication = async (bountyId: string) => {
    try {
      setIsLoading(true);
      await bountyApplication(bountyId, courseId);
      await refreshAllData();
    } catch {
      setError("Failed to apply.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelApplication = async (applicationId: string, bountyId: string) => {
    try {
      setIsLoading(true);
      await cancelBountyApplication(applicationId, bountyId);
      await refreshAllData();
    } catch {
      setError("Failed to cancel.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBountySubmission = async (bountyId: string, submittedLink: string, notes: string, applicationId: string) => {
    try {
      setIsLoading(true);
      await bountySubmission(bountyId, submittedLink, notes, applicationId);
      setOpenFormId(null);
      setSubmittedLink("");
      setNotes("");
      await refreshAllData();
    } catch {
      setError("Failed to submit.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-10 dark:bg-darkPrimary text-gray-800 dark:text-white">
      <Header title="Bounties" />

      <BountyHeader />

      {/* ERROR DISPLAY */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg max-w-2xl mx-auto">
          {error}
        </div>
      )}

      {/* APPLIED BOUNTIES */}
      {appliedBounties.length > 0 && (
        <section className="mb-12 max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0D8267] mb-6">Your Applied Bounties</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {appliedBounties.map((bounty) => (
              <Card key={bounty.id} className="p-6 space-y-4 rounded-xl dark:bg-darkPrimary bg-white">
                <div>
                  <h3 className="text-xl font-semibold">{bounty.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{bounty.description}</p>
                </div>
                <div className="text-sm space-y-2">
                  <div className="flex items-center gap-2">
                    <ClipboardList size={16} /> Type: {bounty.type}
                  </div>
                  <div className="flex items-center gap-2">
                    <BadgeCheck size={16} />
                    Status:{" "}
                    <span
                      className={`font-medium ${bounty.status === "SUCCESSFUL"
                          ? "text-green-600"
                          : bounty.status === "REJECTED" || bounty.status === "FAILED"
                            ? "text-red-500"
                            : "text-gray-600"
                        }`}
                    >
                      {bounty.status === "SUCCESSFUL"
                        ? "Successful - Check your email for details!"
                        : bounty.status === "REJECTED" || bounty.status === "FAILED"
                          ? "Better luck next time"
                          : bounty.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <CalendarDays size={16} /> Due:{" "}
                    {new Date(bounty.expiryDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-[#0D8267] font-bold text-lg">₹ {bounty.amount}</div>

                {!bounty.submittedLink && (
                  <>
                    <Button
                      onClick={() => handleCancelApplication(bounty.id, bounty.bountyId)}
                      className="w-full"
                      variant="secondary"
                      disabled={isLoading}
                    >
                      Cancel Application
                    </Button>
                    <Button
                      className="w-full bg-[#0D8267] hover:bg-[#0b7059] text-white"
                      onClick={() => setOpenFormId(bounty.id)}
                    >
                      Submit Work
                    </Button>
                  </>
                )}

                {openFormId === bounty.id && (
                  <div className="mt-4 space-y-3">
                    <input
                      type="url"
                      value={submittedLink}
                      onChange={(e) => setSubmittedLink(e.target.value)}
                      placeholder="Submission Link"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add Explination"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    <Button
                      className="w-full bg-[#0D8267] hover:bg-[#0b7059] text-white"
                      onClick={() => handleBountySubmission(bounty.bountyId, submittedLink, notes, bounty.id)}
                      disabled={!submittedLink || isLoading}
                    >
                      {isLoading ? "Submitting..." : "Submit Bounty"}
                    </Button>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* ALL BOUNTIES */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-[#0D8267] mb-6">Available Bounties</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {bounties && bounties.length > 0 ? (
            bounties.map((bounty: Bounty, index: number) => (
              <motion.div
                key={bounty.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="flex flex-col justify-between p-6 rounded-xl shadow-sm dark:bg-darkPrimary bg-white hover:shadow-lg transition-all">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-[#0D8267]">{bounty.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{bounty.description}</p>

                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <div className="flex items-center gap-1">
                        <ClipboardList size={16} /> {bounty.type}
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarDays size={16} /> {new Date(bounty.expiryDate).toLocaleDateString()}
                      </div>
                      <div className="col-span-2 flex items-center gap-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${bounty.isSlotsAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                          {bounty.slots} Slots • {bounty.isSlotsAvailable ? "Available" : "Filled"}
                        </span>
                      </div>
                    </div>

                    {bounty.link && (
                      <a href={bounty.link} target="_blank" className="text-sm text-blue-600 underline flex items-center gap-1 mt-2">
                        <Link2 size={16} /> View Link
                      </a>
                    )}
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-[#0D8267] font-bold">₹ {bounty.amount}</div>
                    <Button
                      onClick={() => handleBountyApplication(bounty.id)}
                      disabled={!bounty.isSlotsAvailable || isLoading}
                      className={`text-white px-4 py-2 rounded-lg ${bounty.isSlotsAvailable
                          ? "bg-[#0D8267] hover:bg-[#0b7059]"
                          : "bg-gray-400 cursor-not-allowed"
                        }`}
                    >
                      {bounty.isSlotsAvailable ? "Apply" : "Slots Filled"}
                    </Button>
                  </div>
                </Card>

              </motion.div>
            ))
          ) : (
            <div>
              <h2 className="text-md font-bold text-primary mb-6">No Bounties Available</h2>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
