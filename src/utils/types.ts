export type Class = {
  id: string;
  mainLine: string;
  instructor: string;
  date: Date;
  location: string;
  length: number;
  price: string;
};

export type BookingClass = {
  id: string;
  bookingId: string;
  classId: string;
  class: Class;
};

export type Booking = {
  id: string;
  profileId: string;
  totalPrice: number;
  isPaid: boolean;
  createdAt: Date;
  classes: BookingClass[];
};

export type Profile = {
  email: string;
  clerkId: string | null;
  fullName: string | null;
};
