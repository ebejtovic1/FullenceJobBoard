export interface Job {
  id: string;
  title: string;
  description: string;
  imagePath: string;
  location: string;
  jobType: string;
  firm: string;
  descSubstring: string;
} //definira kako objekat izgleda ali se ne moze instancirati, ovo radimo kako bi znali sta unosimo u nas Post, kakav tip podataka
