import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import type { AddCertificateResponse } from "@/lib/api";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  FileText,
  QrCode,
  ShieldCheck,
} from "lucide-react";

const INITIAL_FORM = {
  studentName: "",
  institution: "",
  issueDate: "",
};

const IssueCertificate = () => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AddCertificateResponse | null>(null);
  const { toast } = useToast();

  const formattedIssueDate = result?.certificate?.issueDate
    ? new Date(result.certificate.issueDate).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await api.addCertificate({
        studentName: formData.studentName,
        institution: formData.institution,
        issueDate: formData.issueDate,
      });

      if (response.success && response.data) {
        setResult(response.data);
        toast({
          title: "Certificate issued",
          description: "The certificate was added and recorded on the blockchain.",
        });
        setFormData(INITIAL_FORM);
      } else {
        toast({
          title: "Unable to issue certificate",
          description: response.message || "Please verify the details and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Network error",
        description: "We couldn't reach the server. Try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (result?.certificate?.certificateHash) {
      api.downloadCertificate(result.certificate.certificateHash);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/90 to-background flex flex-col">
      <Navbar />

      <section className="relative flex-1 py-24"> 
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            aria-hidden="true"
            className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
            animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.05, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute bottom-0 -right-32 h-[28rem] w-[28rem] rounded-full bg-secondary/10 blur-3xl"
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 0.95, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-10">
            <div className="flex items-center gap-3">
              <Link to="/" className="inline-flex">
                <Button variant="outline" className="gap-2 border-border hover:border-primary/60">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
              <Link to="/verify" className="inline-flex">
                <Button variant="ghost" className="gap-2 hover:text-primary">
                  Verify Certificate
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Secure, tamper-proof issuance
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-card/60 backdrop-blur-xl border border-border/70 rounded-3xl shadow-xl shadow-primary/5"
            >
              <div className="border-b border-border/60 px-8 py-6">
                <div className="flex items-center gap-3">
                  <Award className="h-10 w-10 text-primary" />
                  <div>
                    <h1 className="text-3xl font-bold">Issue Certificate</h1>
                    <p className="text-sm text-muted-foreground">
                      Create a blockchain-backed certificate with a QR verification link.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="studentName">Student Name</Label>
                  <Input
                    id="studentName"
                    name="studentName"
                    placeholder="e.g. Jane Doe"
                    value={formData.studentName}
                    onChange={handleChange}
                    className="bg-background/70 text-foreground placeholder:text-muted-foreground border-border focus-visible:ring-primary"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="institution">Issuing Institution</Label>
                  <Input
                    id="institution"
                    name="institution"
                    placeholder="e.g. State University"
                    value={formData.institution}
                    onChange={handleChange}
                    className="bg-background/70 text-foreground placeholder:text-muted-foreground border-border focus-visible:ring-primary"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="issueDate">Issue Date</Label>
                  <Input
                    id="issueDate"
                    name="issueDate"
                    type="date"
                    value={formData.issueDate}
                    onChange={handleChange}
                    className="bg-background/70 text-foreground placeholder:text-muted-foreground border-border focus-visible:ring-primary"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-transform hover:-translate-y-0.5"
                >
                  {loading ? "Issuing certificate..." : "Issue Certificate"}
                </Button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6"
            >
              <div className="bg-primary/10 border border-primary/20 rounded-3xl p-8 backdrop-blur-sm">
                <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                  Why it matters
                </h2>
                <p className="text-muted-foreground mb-6">
                  Certificates issued through BLOCK VERIFY are instantly verifiable and protected against tampering.
                </p>
                <div className="grid gap-4">
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">Immutable Records</h3>
                      <p className="text-sm text-muted-foreground">
                        Each credential receives a unique hash stored on the blockchain for permanent proof.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <QrCode className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">QR Verification</h3>
                      <p className="text-sm text-muted-foreground">
                        Graduates receive a QR code that lets anyone verify authenticity in seconds.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">Issued in Moments</h3>
                      <p className="text-sm text-muted-foreground">
                        Automation removes manual checks so your team can focus on students, not paperwork.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-card/70 border border-border/70 rounded-3xl p-6 shadow-lg shadow-primary/5 space-y-5"
                >
                  <div className="flex items-center gap-3 text-primary">
                    <CheckCircle2 className="h-6 w-6" />
                    <span className="font-semibold">Certificate issued successfully</span>
                  </div>

                  <div className="grid gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Student</span>
                      <p className="text-base font-semibold">{result.certificate.studentName}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Institution</span>
                      <p className="text-base font-semibold">{result.certificate.institution}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Issue Date</span>
                      <p className="text-base font-semibold">
                        {formattedIssueDate}
                      </p>
                    </div>
                    <div className="grid gap-1">
                      <span className="text-muted-foreground">Certificate Hash</span>
                      <code className="block break-all rounded-lg bg-muted px-3 py-2 text-xs">
                        {result.certificate.certificateHash}
                      </code>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <span className="text-muted-foreground text-sm">Verification QR</span>
                    <div className="flex justify-center">
                      <img
                        src={result.qrCode}
                        alt="Certificate QR code"
                        className="h-40 w-40 rounded-xl border border-border bg-background p-3"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button onClick={handleDownload} className="flex-1 min-w-[160px]">
                      Download PDF
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 min-w-[160px]"
                      onClick={() =>
                        navigator.clipboard.writeText(result.certificate.certificateHash)
                      }
                    >
                      Copy Hash
                    </Button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default IssueCertificate;
