"use client"
import { SetStateAction, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ThumbsUp, ThumbsDown, Search, Bell, LogOut, Home, PlusCircle, User, Info, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

import Navbar from "../../../../Components/DISTRICT/DirectorNavbar/page"


// import "../../../Components/ParticularActivityInfo"
// import "../../../../Components/DISTRICT/ParticularActivityInfo"

type Upload = {
  _id: string;
  pic: string;
  uploadedBy: string;
  isApproved: boolean;
  isHallofFame: boolean;
  createdAt: string;
  updatedAt: string;
};

type Activity = {
  _id: string;
  title: string;
  desc: string;
  pic: string;
  category: string;
  postedBy: string[];
  Registrations: string[];
  uploads: Upload[];
  createdAt: string;
  updatedAt: string;
};



function ReviewActitvity() {
  const [pic, setPic] = useState([]);
  // const token = localStorage.getItem("jwt");
  const [selectedActivity, setSelectedActivity] = useState(null)
  const [activities, setActivities] = useState<Activity[]>([]);

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
    router.push(`../../../../Components/DISTRICT/ParticularActivityInfo?id=${id}`);
  };

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    setToken(jwt);
  }, []);


  useEffect(() => {

    // if (!token) {
    //   gotohome();
    //   return;
    // }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/allActivities`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
    })
        .then((res) => res.json())
        .then((result) => {
            setActivities(result);
            // setPosts(result)
            console.log(pic);
        });

    // const fetchActivities = async () => {
    //   try {
    //     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/allActivities`);
    //     const data = await res.json();
    //     setActivities(data); // assuming the API returns an array directly
    //   } catch (error) {
    //     console.error('Error fetching activities:', error);
    //   }
    // };

    // fetchActivities();
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
          {activities.map((activity) => (
            <motion.div
              key={activity._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -5 }}
              className="h-full"
            >
              <Card className="overflow-hidden h-full bg-white/95 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
                <div
                  className="relative cursor-pointer"
                  onClick={() => handleClickSubmitId(activity._id)}
                >
                  <img
                    src={activity.pic || "/placeholder.svg"}
                    alt={activity.title}
                    className="w-full h-48 object-cover hover:opacity-90 transition-opacity duration-200"
                  />
                  <Badge className="absolute top-3 right-3 bg-blue-600 hover:bg-blue-700">
                    {activity.category}
                  </Badge>
                </div>
                <CardContent className="p-5">
                  <h3 className="text-xl font-bold mb-2">{activity.title}</h3>
                  <p className="text-gray-600 mb-4">{activity.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}




        </div>
      </div>






    </div>
  )
}

export default ReviewActitvity