"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import PredictionGraph from "@/components/PredictionGraph";
import { useState } from "react";
import YieldLossGraph from "@/components/YieldLossGraph";
import Loading from "@/components/Loading";
import InvalidAddress from "@/components/InvalidAddress";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getPestManagementInfo } from "@/components/PestManagement";
import Change from "@/components/Change";

const formSchema = z.object({
  city: z.string().min(4, { message: "Enter a valid city" }),
  cropAge: z.coerce.number().min(1, { message: "Enter a valid crop age" }),
  cropGen: z.coerce
    .number()
    .min(1, { message: "Enter a valid crop generation" }),
  area: z.coerce.number().min(1, { message: "Enter a valid land area" }),
  type: z.enum(["eggs", "deadhearts", "ysb"], {
    required_error: "You need to select a notification type.",
  }),
});

const getCropStage = (cropAge: number) => {
  if (cropAge >= 0 && cropAge <= 100) return "Vegetative";
  if (cropAge >= 101 && cropAge <= 135) return "Reproductive";
  if (cropAge >= 136) return "Harvest";
  return "Unknown";
};

const Solutions = () => {
  const [pred, setPred] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState("");
  const [condition, setCondition] = useState("");
  const [lat, setLat] = useState<number>();
  const [long, setLong] = useState<number>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const cropStage = getCropStage(values.cropAge);
    setStage(cropStage);
    setCondition(values.type);
    setLoading(true);
    try {
      const coordinates = await axios.get(
        "https://geocoding-api.open-meteo.com/v1/search",
        {
          params: {
            name: values.city,
            count: 1,
            language: "en",
            format: "json",
          },
        }
      );
      console.log("coordinates:", coordinates.data);
      if (!coordinates.data.results) {
        setOpen(true);
        setLat(coordinates.data.results[0].latitude);
        setLong(coordinates.data.results[0].longitude);
      }
      const weather = await axios.get(
        "https://api.open-meteo.com/v1/forecast",
        {
          params: {
            latitude: coordinates.data.results[0].latitude,
            longitude: coordinates.data.results[0].longitude,
            current: "temperature_2m,relative_humidity_2m,rain",
            past_days: 1,
            models: "metno_seamless",
          },
        }
      );

      const inputData = {
        crop_age_in_days: values.cropAge,
        crop_generation: values.cropGen,
        field_area_in_hectares: values.area,
        temperature_celsius: weather.data.current.temperature_2m,
        relative_humidity_percent: weather.data.relative_humidity_2m,
        rainfall_mm: weather.data.rain,
      };
      const prediction = await axios.post(
        "http://192.168.1.9:5000/predict",
        inputData
      );
      setPred(prediction.data);
      console.log(prediction.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="flex flex-col  flex-1 gap-20">
        <div>
          <p className="text-[#121b0e] tracking-light text-[32px] font-bold leading-tight min-w-72 mb-3">
            Rice field yellow stem borers prediction
          </p>
          <div className="flex gap-20">
            <div className="w-full lg:w-1/2">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Tuguegarao" {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cropAge"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Crop Age in days</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g. 1"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cropGen"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Crop Generation</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g. 1"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="area"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Land Area in hectares</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g. 1"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Notify me about...</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1">
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="deadhearts" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Do you observe deadhearts or white earheads?
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="ysb" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Do you observe adult yellow stemborer moths?
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="eggs" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Are there orange or yellow hairy eggs on leaf
                                blades?
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button className="bg-primary flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#5de619] text-[#121b0e] text-sm font-bold leading-normal tracking-[0.015em]">
                    <span className="truncate">Predict</span>
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="grid gap-16">
            {pred && (
              <PredictionGraph
                title="Pest Incidence Prediction Per Week"
                xAxis={pred.pest_incidence_per_week.xaxis}
                yAxis={pred.pest_incidence_per_week.yaxis}
                implications={pred.pest_incidence_per_week.implications}
              />
            )}
            <div className="flex justify-between">
              {pred && (
                <Change
                  direction={pred.first_change.change_direction}
                  value={pred.first_change.percentage_change}
                  week={pred.first_change.week}
                />
              )}
              {pred &&
                stage &&
                condition &&
                getPestManagementInfo({ cropStage: stage, type: condition })}
            </div>

            {pred && (
              <YieldLossGraph
                actualYieldLoss={
                  pred.actual_vs_predicted_yield_loss.actual_yield_loss_percent
                }
                predictedYieldLoss={
                  pred.actual_vs_predicted_yield_loss
                    .predicted_yield_loss_percent
                }
                xAxis={pred.actual_vs_predicted_yield_loss.x_axis}
                title="Actual Yield Loss vs Predicted Yield Loss"
                scale={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90]}
                error={pred.mean_absolute_error_yield.toFixed(2)}
              />
            )}
          </div>
        )}
      </div>
      {open && (
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent>
            <InvalidAddress />
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default Solutions;
