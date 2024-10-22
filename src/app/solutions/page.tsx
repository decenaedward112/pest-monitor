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
import { getPestManagementInfo } from "@/components/PestManagement";
import Change from "@/components/Change";
import WeatherForecast from "@/components/WeatherForecast";
import { Checkbox } from "@/components/ui/checkbox";

const items = [
  {
    id: "deadhearts",
    label: "Do you observe deadhearts or white earheads?",
  },
  {
    id: "eggs",
    label: "Are there orange or yellow hairy eggs on the lead blades?",
  },
  {
    id: "ysb",
    label: "Do you observe adult yellow stemborer moths?",
  },
] as const;

const formSchema = z.object({
  city: z.string().min(4, { message: "Enter a valid city" }),
  cropAge: z.coerce.number().min(1, { message: "Enter a valid crop age" }),
  cropGen: z.coerce
    .number()
    .min(1, { message: "Enter a valid crop generation" }),
  area: z.coerce.number().min(1, { message: "Enter a valid land area" }),
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
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
  const [condition, setCondition] = useState<any>([]);
  const [weatherForecast, setWeatherForecast] = useState<any>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("values: ", values);
    const cropStage = getCropStage(values.cropAge);
    setStage(cropStage);
    setCondition(values.items);
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

      const forecast = await axios.get(
        "https://api.open-meteo.com/v1/forecast",
        {
          params: {
            latitude: coordinates.data.results[0].latitude,
            longitude: coordinates.data.results[0].longitude,
            daily: "temperature_2m_max",
          },
        }
      );
      setWeatherForecast(forecast.data.daily);

      const inputData = {
        crop_age_in_days: values.cropAge,
        crop_generation: values.cropGen,
        field_area_in_hectares: values.area,
        temperature_celsius: weather.data.current.temperature_2m,
        relative_humidity_percent: weather.data.relative_humidity_2m,
        rainfall_mm: weather.data.rain,
      };
      const prediction = await axios.post(
        "http://192.168.1.2:5000/predict",
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
                    name="items"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormDescription>
                            Select all that applies.
                          </FormDescription>
                        </div>
                        {items.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="items"
                            render={({ field }) => {
                              const value = field.value ?? [];
                              return (
                                <FormItem
                                  key={item.id}
                                  className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={value.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...value, item.id])
                                          : field.onChange(
                                              value.filter((v) => v !== item.id)
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {item.label}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
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
            <WeatherForecast wf={weatherForecast} />
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
