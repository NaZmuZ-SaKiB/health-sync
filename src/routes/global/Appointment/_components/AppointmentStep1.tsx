import { gql, useQuery } from "@apollo/client";
import { TAppointmentFormData } from "../Appointment";
import { useState } from "react";
import HSSelect from "@/components/global/shared/HSSelect";
import { TDoctor } from "@/lib/modules/doctor/doctor.type";
import AppointmentDoctorInfo from "./AppointmentDoctorInfo";

type TProps = {
  formData: Partial<TAppointmentFormData>;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  setStep: any;
};

const SPECIALTIES_OPTIONS = gql`
  query GetAllSpecialties($limit: String) {
    getAllSpecialties(limit: $limit) {
      specialties {
        id
        name
      }
    }
  }
`;

const LOCATIONS_OPTIONS = gql`
  query GetAllLocations($limit: String) {
    getAllLocations(limit: $limit) {
      locations {
        id
        name
      }
    }
  }
`;

const DOCTOR_LIST = gql`
  query GetAllDoctors(
    $page: String
    $limit: String
    $searchTerm: String
    $sortBy: String
    $sortOrder: String
    $gender: String
    $specialty: String
    $location: String
    $isVerified: String
    $isDeleted: String
  ) {
    getAllDoctors(
      page: $page
      limit: $limit
      searchTerm: $searchTerm
      sortBy: $sortBy
      sortOrder: $sortOrder
      gender: $gender
      specialty: $specialty
      location: $location
      isVerified: $isVerified
      isDeleted: $isDeleted
    ) {
      doctors {
        id
        user {
          firstName
          lastName
        }
        fee
      }
    }
  }
`;

const AppointmentStep1 = ({ formData, setFormData, setStep }: TProps) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedDoctor, setSelectedDoctor] = useState<string>(
    formData?.appointment?.doctorId || "",
  );

  const { data: specialtiesData, loading: specialtiesLoading } = useQuery(
    SPECIALTIES_OPTIONS,
    {
      variables: {
        limit: "9999",
      },
    },
  );
  const { data: locationsData, loading: locationsLoading } = useQuery(
    LOCATIONS_OPTIONS,
    {
      variables: {
        limit: "9999",
      },
    },
  );

  const { data: doctorsData, loading: doctorsLoading } = useQuery(DOCTOR_LIST, {
    variables: {
      sortBy: "updatedAt",
      page: "1",
      limit: "99999",
      isDeleted: "false",
      isVerified: "true",
      specialty: selectedSpecialty,
      location: selectedLocation,
    },
    skip: !selectedSpecialty || !selectedLocation,
  });

  const specialtyOptions =
    specialtiesData?.getAllSpecialties?.specialties?.map(
      (item: { name: string; id: string }) => ({
        label: item.name,
        value: item.id,
      }),
    ) || [];

  const locationOptions =
    locationsData?.getAllLocations?.locations?.map(
      (item: { name: string; id: string }) => ({
        label: item.name,
        value: item.id,
      }),
    ) || [];

  const doctorOptions =
    doctorsData?.getAllDoctors?.doctors?.map((item: TDoctor) => ({
      label: item.user.firstName + " " + item.user.lastName,
      value: item?.id,
    })) || [];

  return (
    <div>
      <div className="bg-primary-hover mx-auto mb-10 w-full max-w-[400px] space-y-3 rounded-3xl p-10 text-slate-50 shadow-2xl shadow-slate-300">
        <div>
          <label>
            <p className="text-sm font-semibold">Specialty</p>
            <HSSelect
              options={specialtyOptions}
              disabled={specialtiesLoading}
              onValueChange={(v) => setSelectedSpecialty(v)}
            />
          </label>
        </div>

        <div>
          <label>
            <p className="text-sm font-semibold">Location</p>
            <HSSelect
              options={locationOptions}
              disabled={locationsLoading}
              onValueChange={(v) => setSelectedLocation(v)}
            />
          </label>
        </div>

        {selectedSpecialty && selectedLocation && !doctorsLoading && (
          <div>
            <label>
              <p className="text-sm font-semibold">Doctor</p>
              <HSSelect
                options={doctorOptions}
                disabled={
                  !selectedSpecialty || !selectedLocation || doctorsLoading
                }
                onValueChange={(v) => {
                  setSelectedDoctor(v);
                  setFormData((prev: TAppointmentFormData) => ({
                    ...prev,
                    appointment: { doctorId: v },
                  }));
                }}
              />
            </label>
          </div>
        )}
      </div>

      {selectedDoctor && (
        <AppointmentDoctorInfo id={selectedDoctor} setStep={setStep} />
      )}
    </div>
  );
};

export default AppointmentStep1;
