# CLAMP: Contrastive Learning for 3D Multi-View Action-Conditioned Robotic Manipulation Pretraining

[![Project Website](https://img.shields.io/badge/Project-Website-1f6feb.svg)](https://clamp3d.github.io/CLAMP/) [![arXiv](https://img.shields.io/badge/arXiv-PDF-b31b1b.svg)](https://arxiv.org/pdf/2602.00937) [![arXiv abstract](https://img.shields.io/badge/arXiv-abs-b31b1b.svg)](https://arxiv.org/abs/2602.00937)

*Robotics: Science and Systems (RSS) 2026*

[I-Chun Arthur Liu](https://arthurliu.com/), [Krzysztof Choromanski](https://ieor.columbia.edu/content/krzysztof-choromanski), [Sandy Huang](https://shhuang.github.io/), [Connor Schenck](https://storage.googleapis.com/www.connorschenck.com/index.html)

## Summary

CLAMP is a 3D pre-training framework for robotic manipulation that learns image and action representations from large-scale simulated robot trajectories via contrastive learning. From RGB-D images and camera extrinsics, it builds a merged point cloud and re-renders multi-view four-channel observations (depth + 3D coordinates), including dynamic wrist views, to give clearer views of target objects for high-precision tasks. The pre-trained encoders, combined with a Diffusion Policy initialized during pre-training, are fine-tuned on a small number of task demonstrations and outperform state-of-the-art baselines across six simulated and five real-world tasks.
