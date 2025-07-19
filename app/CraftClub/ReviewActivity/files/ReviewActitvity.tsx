"use client"
import { SetStateAction, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ThumbsUp, ThumbsDown, Search, Bell, LogOut, Home, PlusCircle, User, Info, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

import Navbar from "../../Navbar/page"


type Upload = {
  _id: string;
  title: string;
  desc: string;
  pic: string;
  category: string;
};

// import "../../../Components/ParticularActivityInfo"


function ReviewActitvity() {
  const [pic, setPic] = useState<Upload[]>([]);
  // const token = localStorage.getItem("jwt");
  const [selectedActivity, setSelectedActivity] = useState(null)

  const router = useRouter();

  const gotohome = () => {
    router.push('../../../Components/home');
  };

  const [approvals, setApprovals] = useState({})

  const handleApproval = (id: any, isApproved: boolean) => {
    setApprovals((prev) => ({
      ...prev,
      [id]: isApproved,
    }))
  }

  const openActivityModal = (pic: SetStateAction<null>) => {
    setSelectedActivity(pic)
  }

  const closeActivityModal = () => {
    setSelectedActivity(null)
  }


  const handleClickSubmitId = (id: any) => {
    router.push(`../../../Components/ParticularActivityInfo?id=${id}`);
  };



  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/allActivities`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPic(result);
        console.log("Fetched activities:", result); // ✅ not `pic` here
      })
      .catch((error) => {
        console.error("Failed to fetch activities:", error);
      });
  }, []);




  return (
    <div>
      <Navbar />
      {/* <div>
                {pic.map((activity) => (
                    <div key={activity._id} className="border p-4 rounded-lg shadow-md">
                        <img
                            src={activity.pic}
                            alt={activity.title}
                            className="w-full h-48 object-cover rounded"
                        />
                        <h2 className="text-xl font-bold mt-2">{activity.title}</h2>
                        <p>{activity.desc}</p>
                        <p className="text-sm text-gray-500">Category: {activity.category}</p>
                    </div>
                ))}

            </div> */}



      <div className="container mx-auto px-4 pb-16" style={{ marginTop: "60px" }}>
        <h2 className="text-2xl font-bold text-white mb-6">Recent Activities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pic.map((activity) => (
            <motion.div
              key={activity._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -5 }}
              className="h-full"
            >
              <Card className="overflow-hidden h-full bg-white/95 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
                <div className="relative cursor-pointer"
                  onClick={() => handleClickSubmitId(activity._id)}
                >
                  <img
                    src={activity.pic || "/placeholder.svg"}
                    alt={activity.title}
                    className="w-full h-48 object-cover hover:opacity-90 transition-opacity duration-200"
                  />
                  <Badge className="absolute top-3 right-3 bg-blue-600 hover:bg-blue-700">{activity.category}</Badge>

                </div>
                <CardContent className="p-5">
                  <h3 className="text-xl font-bold mb-2">{activity.title}</h3>
                  <p className="text-gray-600 mb-4">{activity.desc}</p>


                  {/* <div className="flex justify-between items-center mt-4">
                                <div className="flex gap-2">
                                  <Button
                                    variant={approvals[activity._id] === true ? "default" : "outline"}
                                    size="sm"
                                    className={approvals[activity._id] === true ? "bg-green-600 hover:bg-green-700" : ""}
                                    onClick={() => handleApproval(activity._id, true)}
                                  >
                                    <ThumbsUp size={16} className="mr-1" />
                                    Approve
                                  </Button>
                                  <Button
                                    variant={approvals[activity._id] === false ? "default" : "outline"}
                                    size="sm"
                                    className={approvals[activity._id] === false ? "bg-red-600 hover:bg-red-700" : ""}
                                    onClick={() => handleApproval(activity._id, false)}
                                  >
                                    <ThumbsDown size={16} className="mr-1" />
                                    Disapprove
                                  </Button>
                                </div>
                                <span className="text-xs text-gray-500">ID: {activity._id}</span>
                              </div> */}



                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>


      {/* Activity Detail Modal */}
     


    </div>
  )
}

export default ReviewActitvity